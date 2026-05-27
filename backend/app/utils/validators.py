from fastapi import UploadFile

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# File header magic bytes for detection
PDF_SIGNATURE = b"%PDF"
DOCX_SIGNATURE = b"PK\x03\x04"  # ZIP-based (DOCX, PPTX etc.)
DOC_SIGNATURE = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"  # OLE2-based (old .doc)


class FileTooLargeError(Exception):
    pass


class UnsupportedFileTypeError(Exception):
    pass


def _detect_type(header: bytes) -> str:
    if header[:4] == PDF_SIGNATURE:
        return "pdf"
    if header[:4] == DOCX_SIGNATURE:
        return "docx"
    if header[:8] == DOC_SIGNATURE:
        return "doc"
    return "unknown"


def validate_file(file: UploadFile) -> None:
    content = file.file.read()

    if len(content) > MAX_FILE_SIZE:
        raise FileTooLargeError(f"File exceeds {MAX_FILE_SIZE // (1024 * 1024)}MB limit")

    file_type = _detect_type(content[:8])
    if file_type == "unknown":
        raise UnsupportedFileTypeError("Unsupported file type. Only PDF and DOCX are supported.")

    file.file.seek(0)
