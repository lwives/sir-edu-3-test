@echo off
IF "%1"=="trabalho" ( GOTO trabalho ) ELSE ( GOTO casa )

:trabalho
mongod --dbpath ../data/
goto fim

:casa
echo casa 
mongod --dbpath data/
goto fim

:fim