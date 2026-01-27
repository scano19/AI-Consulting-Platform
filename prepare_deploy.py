import zipfile
import os

def zip_directory(folder_path, zip_path):
    print(f"Zipping {folder_path} to {zip_path}")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                # Exclude existing zips, scripts, and git folder
                if file.endswith('.zip') or file.endswith('.py') or '.git' in root:
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, folder_path)
                zipf.write(file_path, arcname)
                print(f"Added {arcname}")

if __name__ == "__main__":
    folder = os.path.dirname(os.path.abspath(__file__))
    zip_name = os.path.join(folder, "sercaia_hostinger.zip")
    zip_directory(folder, zip_name)
    print(f"SUCCESS: Created {zip_name}")
