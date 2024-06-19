---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: allensdk
---

(em-content:cave-setup)=
# Setting up CAVEclient

The CAVEclient is the main way to programmatically access the MICrONS data using Python.
The Connectome Annotation Versioning Engine (CAVE) is a suite of tools developed at the Allen Institute and Seung Lab to manage large connectomics data.
In particular, the CAVEclient provides an interface to query the CAVE database for annotations such as synapses, as well as to get a variety of other kinds of information.

:::{important}
This process only needs to happen once per computer
:::

## Installation

To install caveclient, use pip: `pip install caveclient`.

Once you have installed caveclient, to use it you need to set up your user token in one of two ways:

## Setting up credentials 

To access the data programmatically, you need to set up a user token.
This token is assigned by the server and functions as a both a username and password to access any aspect of the data.
You will need to save this token to your computer using the tools.

### Scenario 1: New User, No Previous Account
If you have never interacted with CAVE before, you will need to both create an account and get a token.
Note that you can only have one token at a time, and thus if you create a new token any computer running a previous one will no longer have access.

Step 1: Log into a CAVE site to set up a new account with a GMail-associated email address. To do this, click [this link](https://minnie.microns-daf.com/materialize/views/datastack/minnie65_public) and acknowledge the terms of service associated with the MICrONS dataset. Once you have done this, your account is automatically created.

Step 2: Generate a token.
To generate a token, run the following code in a Jupyter notebook:
```python
from caveclient import CAVEclient
client = CAVEclient()
client.auth.setup_token(make_new=True)
```

This will open a new browser window and ask you to log in.
You will show you a web page with an alphanumeric string that is your token.
Copy your token, and save it to your computer using the following:
```python
client.auth.save_token(token=YOUR_TOKEN)
```
Note that the token must be formatted as a string.

To check if your setup works, run the following:
```python
client = CAVEclient('minnie65_public')
```

If you don't get any errors, your setup has worked and you can move on!

### Scenario 2: Existing user, New computer

If you have already created an account and token but not set up your computer yet, you can use the same token on a new computer.

Step 1) Find your token by running the following code in a Jupyter notebook:
```python
from caveclient import CAVEclient
client = CAVEclient()
client.auth.setup_token(make_new=False)
``` 

This will open a new browser window and ask you to log in.
After lgging in, the page will display your current token (the value after the `token:`).
Copy this token, and save it to your computer using the following:

```python
client.auth.save_token(token=YOUR_TOKEN, overwrite=True)
```
Note that the token must be formatted as a string.

To check if your setup works, run the following:

```python
client = CAVEclient('minnie65_public')
```

If you don't get any errors, your setup has worked and you can move on!

### Something went wrong?

If you are having trouble with authentication or permissions, it is probably because the token you are trying to use is not the one CAVE expects.

To find your current token, run the following code in a Jupyter notebook:
```python
client = CAVEclient()
client.auth.token
```

The notebook will print the token your computer is sending to the server.

If this token is not the one you find from running the code in Scenario 2, follow the steps there to set up your computer with the correct token.
