FROM azul/zulu-openjdk-alpine:15
RUN apk add --no-cache curl tar bash procps
ARG BASE_URL=https://apache-mirror.rbc.ru/pub/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
    && echo "Downloading maven.." \
    && curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL} \
    && echo "Unzip maven.." \
    && tar -zxvf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 \
    && rm -rf /tmp/apache-maven.tar.gz \
    && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

COPY . /app/
WORKDIR /app
RUN mvn clean
RUN mvn install compile package -Dmaven.test.skip=true

FROM azul/zulu-openjdk-alpine:15
EXPOSE 8080/tcp
WORKDIR /root/
COPY --from=0 /app/target/hostmanager*.jar .
COPY --from=0 /app/src/main/resources/application.yml .
CMD java -jar *.jar