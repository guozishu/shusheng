# 将官方 node 用作父镜像
FROM node:14
# 将工作目录设置为 /usr/src/node
WORKDIR /usr/src/app
# 拷贝当前的目录所有文件到工作目录
# 安装依赖包
COPY . ./

RUN npm run clean

RUN npm install

RUN npm run server:install

RUN npm run client:install

EXPOSE 8080

CMD ["npm","run","prod"]
# 使端口 8080 可供此容器外的环境使用

# 在容器启动时运行
# CMD ["npm","start"]