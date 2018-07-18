@echo off
IF "%2"=="repair" ( GOTO repair ) 
IF "%1"=="trabalho" ( GOTO trabalho ) ELSE ( GOTO casa )

:repair
echo "repair"
mongod --dbpath ..\data\ --repair
goto fim

:trabalho
echo "trabalho"
mongod --dbpath ..\data\ --storageEngine=mmapv1 
goto fim

:casa
echo "casa"
mongod --dbpath ..\data\ 
goto fim
"%2"
--storageEngine=wiredTiger 
:fim
