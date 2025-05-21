@echo off
echo Running Bug Finder for Next.js...

if exist temp-bugfixmcp (
  echo Removing existing temp directory...
  rmdir /s /q temp-bugfixmcp
)

echo Cloning repository...
git clone https://github.com/Zrald1/bugfixmcp.git temp-bugfixmcp

cd temp-bugfixmcp

echo Installing dependencies...
call npm install

echo Building project...
call npm run build

echo Running bug finder...
node bin/cli.js find-bug %*

cd ..

echo Done!
