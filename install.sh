#!/bin/bash
command -v npm >/dev/null 2>&1 || { echo -en "I require \033[37;1;43m npm \033[0m but it's not installed.  Aborting.\n" >&2; exit 1; }

echo -en "\033[37;1;46m downloading nwjs \033[0m\n"
mkdir nwjs
OSTYPE = `uname`
if [[ "$OSTYPE" == "linux-gnu" ]]; then
		MACHINE_TYPE=`uname -m`
		if [ ${MACHINE_TYPE} == 'x86_64' ]; then
		  # 64-bit stuff here
			wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-linux-x64.tar.gz
			tar -zxvf nwjs-v0.12.3-linux-x64.tar.gz -C nwjs
		else
		  # 32-bit stuff here
			wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-linux-ia32.tar.gz
			tar -zxvf nwjs-v0.12.3-linux-ia32.tar.gz -C nwjs
		fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
		# Mac OSX
		echo "I guess that you have OSX64. Because no one has a OSX32. IT IS 2015 out here!"
		wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-osx-x64.zip
		tar -zxvf *x64.zip -C nwjs
elif [[ "$OSTYPE" == "cygwin" ]]; then
		# POSIX compatibility layer and Linux environment emulation for Windows
		echo "windows is not enabled here. and anyway use native windows batch script. It will be later"
elif [[ "$OSTYPE" == "msys" ]]; then
		# Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
		echo "msys is not supported yet"
elif [[ "$OSTYPE" == "freebsd"* ]]; then
		# ...
		echo "and freebsd is not supported yet..."
else
		# Unknown.
		echo "error???"
fi


echo "#!/bin/bash\nnwjs/nw ." > run.sh
chmod +x run.sh
echo -en "\033[37;1;46m now, to use the app run: run.sh from root directory \033[0m\n"

