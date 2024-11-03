
#!/bin/bash
i=0
for file in assets/videos/nvs/*.mp4; do
    ffmpeg -i $file -vf "crop=in_w:in_h*0.97:0:in_h*0.03" -c:v libx264 -crf 18 -preset slow -c:a copy $i.mp4 -y
    i=$((i+1))
done

