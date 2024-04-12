import csv
import random
from datetime import datetime, timedelta


def generate_random_data(start_date, end_date):
    data = []
    current_date = start_date

    while current_date <= end_date:
        created_at = current_date.strftime("%Y-%m-%d %H:%M:%S UTC")
        entry_id = random.randint(100, 999)
        field2 = random.randint(0, 20)
        data.append((created_at, entry_id, field2))
        current_date += timedelta(days=1)
    return data


start_date = datetime(2020, 2, 18, 16, 54, 7)
end_date = datetime(2024, 4, 2, 16, 54, 7)

random_data = generate_random_data(start_date, end_date)

# Saving data to CSV file
with open('random_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['created_at', 'entry_id', 'field2'])
    writer.writerows(random_data)

print("CSV file generated successfully.")
