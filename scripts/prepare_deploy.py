import zipfile
import os

def zip_directory(source_folder, output_zip_path):
    print(f"Zipping {source_folder} to {output_zip_path}")
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_folder):
            for file in files:
                # Exclude any zip files if they happen to be there
                if file.endswith('.zip'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, source_folder)
                zipf.write(file_path, arcname)
                print(f"Added {arcname}")

if __name__ == "__main__":
    # Current script directory (scripts/)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to 'public' folder (one level up)
    public_dir = os.path.normpath(os.path.join(script_dir, "../public"))
    
    # Output zip path (in the root directory)
    zip_name = os.path.normpath(os.path.join(script_dir, "../sercaia_deploy.zip"))
    
    if os.path.exists(public_dir):
        zip_directory(public_dir, zip_name)
        print(f"\nSUCCESS: Created {zip_name}")
        print("Ready to upload to Hostinger (public_html).")
    else:
        print(f"ERROR: Could not find 'public' directory at {public_dir}")
