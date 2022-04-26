FROM reduardo7/docker-grails:3.2.7

# Copy App files
COPY . /app

# Run Grails dependency-report command to pre-download dependencies but not 
# create unnecessary build files or artifacts.
RUN grails dependency-report

# Set Default Behavior
ENTRYPOINT ["grails"]
CMD ["run"]
