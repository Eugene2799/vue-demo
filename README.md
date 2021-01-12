# Demo

[Demo](https://eugene2799.github.io/webappFrontend/#/ "预览地址")

# docker部署方法

## docker build
```
docker build -t webappfrontend .
```

### docker run
```
docker run -d --name=webappFrontend -p 8080:80 webappfrontend:latest
```

### 预览地址
```
http://localhost:8080/
```
