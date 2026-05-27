# 招聘数据采集与分析工具

为AI招聘/简历分析产品提供数据支持的爬虫与分析项目

## 项目背景
为了开发AI简历分析器等产品，需要真实的市场招聘数据。本项目实现了模拟招聘数据的抓取、清洗、统计分析和可视化。

## 核心功能与贡献
- 使用requests抓取招聘数据
- pandas进行数据清洗和统计（薪资、城市、技能分布等）
- matplotlib + seaborn生成4类可视化图表
- 输出结构化数据（CSV、JSON、Excel），可直接用于AI训练或分析

## 产品思考
- 此项目为后续AI招聘产品打下数据基础
- 思考了数据合规性、反爬机制处理
- 下一步计划：接入真实招聘API或大规模数据

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
