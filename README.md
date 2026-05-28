# AI简历分析器
使用AI帮助求职者分析简历、匹配JD并给出优化建议。

## 项目背景
求职者投递简历时经常不知道匹配度如何、缺少哪些关键词。本工具支持上传简历,AI自动分析并提供改进建议。

## 核心功能
- 上传简历
- AI提取关键信息
- 与目标JD对比，给出匹配分数和优化建议
- 生成改进后的简历要点

## 我的贡献
- 独立完成产品设计、Prompt优化和网页界面开发
- 重点解决AI幻觉问题，让建议更可靠
- 从命令行版本升级到Streamlit网页版

##技术栈
Python + Streamlit + AI模型

## 文件说明
- crawler.py：主程序
- analysis.xlsx / data_cleaned.json：分析结果
- recruitment_analysis.png：可视化报告

## 预览
<img width="2559" height="1531" alt="ad633165232266492effe7ac076d4c82" src="https://github.com/user-attachments/assets/3368541b-8945-4f72-95aa-515f32240640" />
<img width="2555" height="1484" alt="4b0a1f23e466a58e7ff1edec8ba68e7f" src="https://github.com/user-attachments/assets/1d5c24e6-5cc2-434a-bf1d-16d45020da8e" />
<img width="2547" height="1493" alt="0739061676035d11af3245dc082032c4" src="https://github.com/user-attachments/assets/0c2af29f-79cd-4273-8f8f-af628b37b588" />

## 使用

打开 [http://localhost:5173](http://localhost:5173) 即可使用
