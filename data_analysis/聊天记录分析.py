## 1. 导入包解析json文件为table
import json
import pandas as pd
import jieba
import datetime as dt
import re
import jieba.posseg as pseg

# 读取json文件
with open("/Users/huyan/Desktop/聊天记录.json", "r") as f:
    data = json.load(f)

# 解析json文件
df_list = pd.json_normalize(data)
# 按照字段的名字读取为table
df = pd.DataFrame(df_list)

# 筛选出需要的列，如聊天内容、聊天时间等
df = df[["mesDes", "msgContent", "msgCreateTime"]]

# 使用datetime将msgCreateTime转换为datetime类型，并调整时区
df['msgCreateTime'] = pd.to_datetime(df['msgCreateTime']*1000, unit='ms')
df['msgCreateTime'] = df['msgCreateTime'] + pd.Timedelta(hours=8)  # 调整为北京时间


# 告诉我msgCreateTime列按天去重求长度
print(df['msgCreateTime'].dt.date.nunique())
# 148

# msgCreateTime按天分组之后求行数整理为这种格式：["2024-07-13", 2402], ["2024-08-23", 1873],...
df_grouped = df.groupby(df['msgCreateTime'].dt.date).size().reset_index()
df_grouped.columns = ['date', 'count']

# 将日期转换为字符串格式
df_grouped['date'] = df_grouped['date'].astype(str)

# 将数据转换为所需的格式
result = df_grouped.apply(lambda x: [x['date'], x['count']], axis=1).tolist()
print(result)

# 统计平均每天消息数
print(df_grouped['count'].mean())

# 统计不是表情包、图片、emoji的消息的数量、文本长度均值
def is_not_text(text):
    # 定义非文本消息的特征
    pattern = re.compile(
        r"<msg>|"          # 图片、视频等富媒体消息
        r"<?xml|"          # XML格式的消息
        r"\[.*?\]|"        # 表情包格式 [表情]
        r"[\U0001F000-\U0001F9FF]|"  # Unicode表情
        r"[\u2600-\u26FF\u2700-\u27BF]"  # 其他特殊符号和表情
        , flags=re.UNICODE)
    return bool(pattern.search(str(text)))

# 筛选纯文本消息
text_messages = df[~df['msgContent'].apply(is_not_text)]

# 计算统计信息
text_count = len(text_messages)
avg_length = text_messages['msgContent'].str.len().mean()

print(f"\n纯文本消息统计：")
print(f"纯文本消息数量：{text_count}")
print(f"平均文本长度：{avg_length:.2f}字")

# 统计des==1的人发送的emoji的数量
# 先过滤掉包含CDATA的消息
emoji_df = df[
    (df['mesDes'] == 1) & 
    (~df['msgContent'].str.contains('CDATA', na=False))
]

# 统计表情使用情况
emoji_counts = emoji_df['msgContent'].str.findall(r'\[.*?\]').explode().value_counts()
print("\n表情使用统计：")
print(f"表情种类数量：{len(emoji_counts)}")
print(f"表情使用总次数：{emoji_counts.sum()}")
print("\n最常用的10个表情：")
print(emoji_counts.head(10))


# 统计des==1的人发送的消息中包含msg或者 xml 的消息的数量
msg_count = df[(df['mesDes'] == 1) & (df['msgContent'].str.contains('msg|xml', na=False))].shape[0]
print(f"\ndes==1的人发送的消息中包含msg或者 xml 的消息的数量：{msg_count}")


# 使用jieba统计文本消息的词频，仅保留超过2个字符的词
# 将所有纯文本消息合并
all_text = ' '.join(text_messages['msgContent'].astype(str))

# 定义常见的停用词（可以根据需要扩展）
stop_words = set(['的', '了', '在', '是', '哈', '嘿', '我', '你', '他', '她', '和', '都', '也', '就', '这', '那', '有', '说'])

# 定义要过滤的模式
filter_patterns = [
    r'哈+',      # 匹配"哈", "哈哈", "哈哈哈"等
    r'嘿+',      # 匹配"嘿", "嘿嘿"等
    r'呵+',      # 匹配"呵", "呵呵"等
    r'啊+',      # 匹配"啊", "啊啊"等
    r'不是',
    r'可以',
    r'没有',
    r'知道',
    r'一个'
]

# 使用jieba词性标注
words_with_tags = []
for word, flag in pseg.cut(all_text):
    # 保留名词(n)、形容词(a)和动词(v)
    if ((flag.startswith('n') or flag.startswith('a') or flag.startswith('v')) and 
        len(word) >= 2 and 
        word not in stop_words and
        not any(re.match(pattern, word) for pattern in filter_patterns)):
        words_with_tags.append(word)  # 只保存词

# 统计词频
word_freq = pd.Series(words_with_tags).value_counts()

# 行名及频数导出为json
word_freq_json = [[word, count] for word, count in word_freq.items()]

# 将结果写入JSON文件
# with open('word_frequency.json', 'w', encoding='utf-8') as f:
#     json.dump(word_freq_json, f, ensure_ascii=False, indent=2)

# df_grouped导出为JSON
df_grouped.to_json('df_grouped.json', orient='records')


# df按小时统计各个时段，des==1发出的消息和des==0发出的消息
df['hour'] = pd.to_datetime(df['msgCreateTime']).dt.hour
hour_count = df.groupby(['hour', 'mesDes']).size().reset_index(name='count')


hour_count.to_json('hour_count.json', orient='records')