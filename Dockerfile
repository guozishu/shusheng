# 将官方 node 用作父镜像
FROM node
# 将工作目录设置为 /usr/src/node
# WORKDIR /home/guozishu/project
# 拷贝当前的目录所有文件到工作目录
# ADD . /home/guozishu/project/
# 安装依赖包
# RUN cd client && npm install && npm run build

# RUN cd ../server && npm install

# RUN cd ../ && npm install

EXPOSE 3000

CMD ["npm","run","prod"]
# 使端口 8080 可供此容器外的环境使用

# 在容器启动时运行
# CMD ["npm","start"]