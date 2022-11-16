# ourRecipe

# Python package install

Install pyenv by following: https://github.com/pyenv/pyenv#installation
Install pipenv by typing: ```pip install pipenv```

Navigate to the project folder and installing required packages.

```
cd /path/to/ourRecipe
pyenv install 3.9.15
pyenv local 3.9.15
pipenv install
```

After installing packages, the environment can be activated by typing:
```
pipenv shell
```

After updating code in flask_server, re-package flask_server:

```
cd /path/to/ourRecipe
pipenv install .
```
