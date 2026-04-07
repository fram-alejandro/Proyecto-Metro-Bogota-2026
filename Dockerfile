# Usamos una imagen de Tomcat que ya tiene Java incluido
FROM tomcat:9.0-jdk11-openjdk

# Borramos las aplicaciones por defecto de Tomcat para que no estorben
RUN rm -rf /usr/local/tomcat/webapps/*

# Copiamos tu archivo WAR a la carpeta de despliegue de Tomcat
# OJO: Verifica que el nombre sea exactamente igual al de tu archivo
COPY dist/Metro_Bogota_2.war /usr/local/tomcat/webapps/ROOT.war

# Exponemos el puerto 8080 que es el que usa Tomcat
EXPOSE 8080

# Comando para iniciar Tomcat
CMD ["catalina.sh", "run"]