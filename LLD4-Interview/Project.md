# Create a Project to scan the files in a folder and categorize them as Compressed(for rar,zip,7zip),
Document(txt,xlsx,pdf,etc), Audio(.mp3), video(mkv,mp4, etc) files


Step : 
1. Read the Folder , use fs.readdir or fs.readdirSync
2. Categorized them, loop through them , and use path module to extract the extension.(path.extname() method)
3. Move Files, create a separate folder for each category and move files( with the help of copy and unlink)


# Video Streaming Server.
