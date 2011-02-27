import sys
import Image

map_width = 16
map_height = 6

im = Image.open("font.png")

p = (0,0)
while im.getpixel(p)[3] == 0:
    p = (p[0],p[1] + 1);
text_height = p[1]
while im.getpixel(p)[3] != 0:
    p = (p[0],p[1] + 1);
    
row_height =  p[1]

locations = []

for row in range(0,map_height):
    x = 0
    for col in range(0,map_width):
        locations.append(x+1)
        locations.append(row*row_height+1)
        p = (x,row*row_height)
        while p[0] < im.size[0] and im.getpixel(p)[3] == 0:
            p = (p[0]+1,row*row_height);
        locations.append(p[0]-x-1)
        locations.append(text_height-1)
        while p[0] < im.size[0] and im.getpixel(p)[3] != 0:
            p = (p[0]+1,row*row_height);
        x = p[0]

print locations
