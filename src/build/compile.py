import sys
import compile

files = [
	"header.txt",
	"../source/caffeine.js", 
	"../source/util.js",
	"../source/soap.js",
	"../source/wsswebservices.js"
]
	
output =  "../compiled/caffeine.js"


def compile(filenames, output):
	"Compiles multiple js files into a single file"
	
	fout = open(output, "w")
	
	for file in filenames:
		f = open(file, "r")
		fout.write(f.read())
		fout.write("\n\n\n")
	
	fout.close()

if __name__ == '__main__':
	compile(files, output)