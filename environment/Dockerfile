# hash:sha256:eff494a4306112723ec8994d02aaa6bee47bc519d9531b75c36edc5241dbdd66
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
    caveclient \
    hdmf-zarr==0.3.0 \
    imageryclient \
    jupyter-book==0.15.1 \
    meshparty \
    nglui \
    pynwb==2.4.0

COPY postInstall /
RUN /postInstall
