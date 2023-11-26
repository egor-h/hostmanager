FROM azul/zulu-openjdk-alpine:15
RUN apk add --no-cache curl tar bash procps
ARG BASE_URL=https://dlcdn.apache.org/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.tar.gz
RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
    && echo "Downloading maven.." \
    && curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL} \
    && echo "Unzip maven.." \
    && tar -zxvf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 \
    && rm -rf /tmp/apache-maven.tar.gz \
    && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

COPY pom.xml .
RUN mvn dependency:go-offline

COPY . /app/
WORKDIR /app
RUN mvn clean
RUN mvn install compile package -Dmaven.test.skip=true

FROM azul/zulu-openjdk-alpine:15
EXPOSE 8080/tcp
WORKDIR /root/
COPY --from=0 /app/target/hostmanager*.jar .
CMD java -jar *.jar