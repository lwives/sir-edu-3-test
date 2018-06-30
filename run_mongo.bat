@echo off
IF "%1"=="trabalho" ( GOTO trabalho ) ELSE ( GOTO casa )

:trabalho
mongod --dbpath ..\data\ --storageEngine=mmapv1
goto fim

:casa
echo casa 
mongod --dbpath ../data/
goto fim

--storageEngine=wiredTiger
:fim
