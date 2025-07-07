FROM mcr.microsoft.com/mssql/server:2022-latest

# Copy entrypoint.sh
COPY entrypoint.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/entrypoint.sh
USER mssql

# Copy SQL initialization scripts
COPY init-scripts/ /opt/mssql-init/init-scripts/

# Combine core entrypoint with copied one
CMD ["/bin/bash", "-c", "/usr/local/bin/entrypoint.sh & /opt/mssql/bin/sqlservr"]

