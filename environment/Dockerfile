# hash:sha256:9c56a830f82862dad37501caa1df76dc310849383e5c42a0f098eaca2af86aa5
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
    caveclient==5.8.1 \
    hdmf-zarr==0.3.0 \
    imageryclient==1.0.3 \
    jupyter-book==0.15.1 \
    meshparty==1.16.14 \
    nglui==2.14.3 \
    pynwb==2.4.0

COPY postInstall /
RUN /postInstall
