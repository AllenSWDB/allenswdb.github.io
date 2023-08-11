# hash:sha256:426500c08665cd2b96acbe2c2d89f2476ec968d6a99668e50a0bf9c54a69f30c
FROM registry.codeocean.allenneuraldynamics.org/codeocean/jupyterlab:3.4.4-miniconda4.12.0-python3.9-ubuntu20.04

ARG DEBIAN_FRONTEND=noninteractive

ARG GIT_ASKPASS
ARG GIT_ACCESS_TOKEN
COPY git-askpass /

RUN conda install -y --channel=conda-forge \
        jupyterlab==3.5.3 \
        notebook==6.4.12 \
    && conda clean -ya

RUN pip install -U --no-cache-dir \
    hdmf-zarr==0.3.0 \
    jupyter-book==0.15.1 \
    pynwb==2.4.0

COPY postInstall /
RUN /postInstall
