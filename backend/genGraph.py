
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pandas.tseries.frequencies import to_offset
from matplotlib.dates import MinuteLocator, SecondLocator, DateFormatter


# รับชื่อไฟล์ที่อัปโหลด
file_name = "Aggregate-Report.jtl"

# อ่านไฟล์ CSV เข้าสู่ DataFrame
df = pd.read_csv(file_name)

data = df

# แปลง timeStamp เป็น datetime รูปแบบ
data['timeStamp'] = pd.to_datetime(data['timeStamp'], unit='ms')

# ตั้งค่า timeStamp ให้เป็น index
data.set_index('timeStamp', inplace=True)

# คำนวณช่วงเวลาที่เหมาะสมสำหรับ resample
def calculate_resample_interval(data, desired_points=20):
    total_duration = data.index[-1] - data.index[0]
    total_seconds = total_duration.total_seconds()
    if total_seconds < desired_points:
        interval_seconds = 1  # เปลี่ยนค่าเป็น 1 วินาทีถ้าช่วงเวลาทั้งหมดน้อยกว่าจำนวนจุดที่ต้องการ
    else:
        interval_seconds = total_seconds / desired_points

    if interval_seconds < 60:
        interval = f"{int(max(1, interval_seconds))}S"  # วินาที
    else:
        interval = f"{int(interval_seconds // 60)}T"  # นาที
    return interval

# กำหนดจำนวนจุดที่ต้องการในกราฟ (ปรับเปลี่ยนตามความเหมาะสม)
desired_points = 50
interval = calculate_resample_interval(data, desired_points)

# Resample ข้อมูลตามช่วงเวลาที่คำนวณได้
resampled_data = data['elapsed'].resample(interval).mean()

# เติม NaN ด้วย 0 หรือค่าอื่นที่เหมาะสม (การเติม NaN)
resampled_data = resampled_data.fillna(0)

# สร้างกราฟเส้นพร้อม markers
plt.figure(figsize=(18, 6))  # ปรับขนาด figure ให้กว้างขึ้น
plt.plot(resampled_data.index, resampled_data.values, marker='o', linestyle='-', color='b')

# ตั้งค่ารูปแบบของ x-axis เพื่อแสดงผลตามช่วงเวลาที่คำนวณได้
plt.title(f'Average Response Time Per {interval}', fontsize=16)
plt.xlabel('TimeStamp', fontsize=14)
plt.ylabel('Average Elapsed Time (ms)', fontsize=14)
plt.grid(True)

# ตั้งค่า major locator และ formatter อัตโนมัติตามช่วงเวลา resample
interval_seconds = int(to_offset(interval).nanos / 1e9)

# เลือกใช้ SecondLocator หรือ MinuteLocator ตามค่า interval ที่คำนวณได้
if interval_seconds < 60:
    locator = SecondLocator(bysecond=range(0, 60, max(1, interval_seconds)))
else:
    locator = MinuteLocator(byminute=range(0, 60, max(1, interval_seconds // 60)))

ax = plt.gca()
ax.xaxis.set_major_locator(locator)
formatter = DateFormatter('%H:%M:%S' if 'S' in interval else '%H:%M')
ax.xaxis.set_major_formatter(formatter)

# ปรับการให้แสดงผล
plt.gcf().autofmt_xdate()  # Auto-fix for overlapping dates
plt.tight_layout()
plt.subplots_adjust(bottom=0.2, right=0.9, left=0.1, top=0.9)  # เพิ่มพื้นที่ระหว่างแกน
plt.show()