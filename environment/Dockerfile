# hash:sha256:624bfc1b8d07713d6df1d4e96c98fc2714ee56a32f27b5aa750bf360591049d0
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
    hdmf-zarr \
    jupyter-book==0.15.1 \
    pynwb

COPY postInstall /
RUN /postInstall
