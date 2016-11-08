docker build -t "sintr" .
docker run -i -p 8080:8080 -p 8990:8990 -t "sintr"
