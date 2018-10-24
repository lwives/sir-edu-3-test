@echo off
IF "%2"=="repair" ( GOTO repair ) 
IF "%1"=="trabalho" ( GOTO trabalho ) ELSE ( GOTO casa )

:repair
echo "repair"
mongod --dbpath ..\data\ --repair
goto fim

:trabalho
echo "trabalho"
\prog\mongodb\bin\mongod --dbpath ..\data\ 
goto fim

:casa
echo "casa"
mongod --dbpath ..\data\ 
goto fim
"%2"
--storageEngine=mmapv1 
--storageEngine=wiredTiger 
:fim
