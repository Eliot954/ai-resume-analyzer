# AI简历分析器

使用AI帮助求职者快速分析简历、匹配JD并给出优化建议。

## 项目背景
求职者经常不知道自己的简历与目标岗位匹配度如何、缺少哪些关键词、如何改进。本工具让用户上传简历，AI自动分析并提供专业建议。

## 核心功能
- 支持上传PDF/文本格式简历
- AI提取教育、工作经验、技能等关键信息
- 与用户提供的JD进行匹配度打分
- 输出缺失技能、改进建议、优化后的简历要点

## 我的产品思考与贡献
- 独立负责从0到1的产品设计：定义用户流程、prompt工程、输出结构
- 重点考虑AI hallucination问题（避免给出不准确的建议）
- 设计了清晰的用户交互：上传 → 分析 → 查看报告 → 迭代
- 思考了隐私保护（本地运行，不上传服务器）

## 技术栈
- Python + Streamlit
- AI模型调用（Hugging Face / OpenAI API 等）

## 如何运行
1. `git clone https://github.com/Eliot954/ai-resume-analyzer.git`
2. `cd ai-resume-analyzer`
3. `pip install -r requirements.txt`
4. `streamlit run app.py`

## 演示
<img width="2559" height="1531" alt="ad633165232266492effe7ac076d4c82" src="https://github.com/user-attachments/assets/a467304d-b664-4705-a4d9-32587fd8dfef" />
<img width="2555" height="1484" alt="4b0a1f23e466a58e7ff1edec8ba68e7f" src="https://github.com/user-attachments/assets/51a69c3c-6995-4609-9fe4-84a66e67d837" />
<img width="2547" height="1493" alt="0739061676035d11af3245dc082032c4" src="https://github.com/user-attachments/assets/ea9a0425-adcc-43eb-be22-3b55fb1921a8" />
打开http://localhost:5173查看
