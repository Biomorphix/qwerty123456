#!/bin/bash
command -v npm >/dev/null 2>&1 || { echo -en "I require \033[37;1;43m npm \033[0m but it's not installed.  Aborting.\n" >&2; exit 1; }

echo -en "\033[37;1;46m downloading nwjs \033[0m\n"
mkdir nwjs
OSTYPE=`uname`
if [ ${OSTYPE} == "Linux" ]; then
	MACHINETYPE=`uname -m`
	if [ ${MACHINETYPE} == "x86_64" ]; then
		wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-linux-x64.tar.gz
	else
		wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-linux-ia32.tar.gz
	fi
	tar -zxvf *.tar.gz
	rm *tar.gz
elif [ ${OSTYPE} == 'darwin' ]; then
	wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-osx-x64.zip
	unzip *x64.zip
	rm *.zip
else
	echo -en "\033[37;1;46m I don't know how to work with your OS. ${OSTYPE}"
fi

mv ./nwjs-* ./nwjs
echo -en "\033[37;1;46m now, to use the app run: run.sh from root directory \033[0m\n"
