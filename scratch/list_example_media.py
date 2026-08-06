import os

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"
files = sorted(os.listdir(public_dir))

print(f"Total files in example_media: {len(files)}")
for f in files:
    if f.endswith('.png') or f.endswith('.jpg'):
        print(f)
