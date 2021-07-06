// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "django-factory" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	/*
	Generate main html template for a django project
	*/
	let mainTemplate = vscode.commands.registerCommand('django-factory.createMainTemplate', async function () {
		// Display an error message if project folder is not open
		if (!vscode.workspace){
			return vscode.window.showErrorMessage('Please open a project folder first.');
		}
		
		let folderPath = vscode.workspace.workspaceFolders[0].uri.path
		.slice(1,)
		.toString();
		
		// Display an error message if it's not a django project
		if (!fs.existsSync(`${folderPath}/manage.py`)){
			return vscode.window.showErrorMessage('Please open a django project.');
		}

		const htmlContent = `{% load static %}

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>TITLE</title>
		<script src="{% static 'assets/index.js' %}"></script>
		<link rel="stylesheet" href="{% static 'assets/main.css' %}"/>
		<link rel="icon" type="image/png" href="ICON URL"/>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	</head>

	<body class="bg-secondary" style="min-height:100vh; display:flex; flex-direction:column;">
		<header>
			{% block main_menu %}
				<ul class="navbar navbar-expand-lg  navbar-dark bg-dark w-auto">
					<div class="container-fluid">
						<a class="navbar-brand nav-link fs-2 text-start" href="/">BRAND</a>
						<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon text-light"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav me-auto mb-2 mb-lg-0">
								<li class="nav-item px-2 fs-3 pt-2"><a href="/a/" class="nav-link text-light"> A </a></li>
								<li class="nav-item px-2 fs-3 pt-2"><a href="/b/" class="nav-link text-light"> B </a></li>
								<li class="nav-item px-2 fs-3 pt-2"><a href="/c/" class="nav-link text-light"> C </a></li>
								<li class="nav-item px-2 fs-3 pt-2"><a href="/d/" class="nav-link text-light"> D </a></li>
								<li class="nav-item px-2 fs-3 pt-2"><a href="/e/" class="nav-link text-light"> E </a></li>
							<ul>
						</div>
					</div>
				</ul>
			{% endblock %}
		</header>

		<div class="container-xxl  bd-layout">
			{% block content %}
			{% endblock %}
		</div>

		<footer class="bd-footer pt-3 pb-2 mb-0 bottom-0 bg-dark bg-gradient text-white" style="min-width:400px; margin-top:auto;">
			<div class="container text-center">
				<div class="row ">
					<div class="col-4">
						<div class="">
							<h3 class="" style="font-size:3vw;">Developped with:</h3>
						</div>
					</div>
					<div class="col-4">
						<div class="">
							<h3 class="" style="font-size:3vw;">Host on:</h3>
						</div>
					</div>
					<div class="col-4">
						<div class="">
							<h3 class="" style="font-size:3vw;">Domain:</h3>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-4">
						<a href="https://www.djangoproject.com/">
							<div style="background: url('https://static.djangoproject.com/img/logo-django.90b49074bac7.png') center no-repeat;">
								<h1 class="invisible">Django</h1>
							</div>
						</a>
					</div>
					<div class="col-4">
						<a href="https://www.raspberrypi.org/" >
							<img src='https://www.raspberrypi.org/app/uploads/2018/03/RPi-Logo-Reg-SCREEN.png' alt="" style="max-width:6vw;">
						</a>
					</div>
					<div class="col-4">
						<a href="https://www.ovh.com/" >
							<img src='https://www.ovh.com/fr/images/newLogos/logo-ovh.png' alt="" style="max-width:25vw;">
						</a>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<p class="text-center " style="font-size:2vw;">
							Some cool text
						</p>
					</div>
				</div>
			</div>
		</footer>
	</body>
</html>`;
		// Check if templates/ folder exists
		const templatesFolder = './templates';
		if(!fs.existsSync(templatesFolder)){
			fs.mkdirSync(folderPath+templatesFolder.slice(1,), { recursive: true });
		}

		// check if file already exist and ask to user
		if(fs.existsSync(path.join(folderPath, 'templates/main.html'))){
			vscode.window.showInformationMessage(
				`There is already a ./templates/main.html - Erase it?`,
				...["Yes", "No"]
			)
			.then((answer) => {
				if (answer == "No"){
				vscode.window.showErrorMessage('Abortion.');
				};
				if (answer == "Yes"){
					// Writing main.html on templates folder
					fs.writeFile(path.join(folderPath, 'templates/main.html'), htmlContent, (err) => {
						if (err) {
							return vscode.window.showErrorMessage(
								'Failed to create the main template.'
							);
						}
						vscode.window.showInformationMessage('Created main template.');					
					});
				};
			});
		};
	});

	/*
	Generate a simple app template, creating folders too.
	*/
	let appTemplate = vscode.commands.registerCommand('django-factory.createAppTemplate', async function(a=vscode.Uri) {
		// Display an error message if project folder is not open
		if (!vscode.workspace){
			return vscode.window.showErrorMessage('Please open a project folder first.');
		}
		let workplacePath = vscode.workspace.workspaceFolders[0].uri.path
		.slice(1,)
		.toString();

		// Display an error message if it's not a django project
		if (!fs.existsSync(`${workplacePath}/manage.py`)){
			return vscode.window.showErrorMessage('Please open a django project.');
		}
		let folderPath = a.path.slice(1,);
		let appName = folderPath.toString().split('/').slice(-1)[0];
		const htmlContent = `{% extends "base.html" %}

 {% block content %}
 {% endblock content %}`;
		// Check if templates/ folder exists
		const templatesFolder = path.join(folderPath, 'templates');
		if(!fs.existsSync(templatesFolder)){
			fs.mkdirSync(templatesFolder, { recursive: true });
		}
		// Check if templates/app/ folder exists
		const templatesAppFolder = path.join(templatesFolder, appName);
		if(!fs.existsSync(templatesAppFolder)){
			fs.mkdirSync(templatesAppFolder, { recursive: true });
		}
		// check if file already exist and ask to user
		if(fs.existsSync(path.join(templatesAppFolder, appName+'html'))){
			vscode.window.showInformationMessage(
				`There is already a ${appName}.html - Erase it?`,
				...["Yes", "No"]
			)
			.then((answer) => {
				if (answer == "No"){
				vscode.window.showErrorMessage('Abortion.');
				};
				if (answer == "Yes"){
					// Writing app.html on templates folder
					fs.writeFile(path.join(templatesAppFolder, appName+'.html'), htmlContent, (err) => {
						if (err) {
							return vscode.window.showErrorMessage(
								'Failed to create the app template.'
							);
						}
						vscode.window.showInformationMessage(`Created ${appName} template.`);
					});
				};
			});
		};
	});

	/*
	Generate serializers.py taking models from models.py
	*/
	let appSerializer = vscode.commands.registerCommand('django-factory.createAppSerializers', async function(a=vscode.Uri) {
		// Display an error message if project folder is not open
		if (!vscode.workspace){
			return vscode.window.showErrorMessage('Please open a project folder first.');
		}

		let workplacePath = vscode.workspace.workspaceFolders[0].uri.path
		.slice(1,)
		.toString();

		// Display an error message if it's not a django project
		if (!fs.existsSync(`${workplacePath}/manage.py`)){
			return vscode.window.showErrorMessage('Please open a django project.');
		}
		// Display an error message if models.py doesn't exist in app
		let appPath = a.path.slice(1,);
		let modelsPath = path.join(appPath, 'models.py')
		if (! fs.existsSync(modelsPath)){
			return vscode.window.showErrorMessage('There is no models.py file in this app.')
		}
		// read models.py file
		let list;
		let classes = [];
		let data = fs.readFileSync(modelsPath, {encoding:'utf-8', flag:'r'});
		list = data.split('\n');
		list.forEach(function (item, index) {
			try {
				if (item.slice(0, 5) == 'class'){
					let classe;
					classe = item;
					classe = classe.split(' ')[1];
					classe = classe.split(':')[0];
					classe = classe.split('(')[0];
					classes.push(classe);
				}
			} catch (error) {
			}
		});
		let serializers = "";
		classes.forEach(function (item, index) {
		let serializer = `

class ${item}Serializer(serializers.ModelSerializer):
	"""
	${item} serializer
	Based on serializers.ModelSerializer
	"""
	class Meta:
		model = ${item}
		fields = "__all__"
`;
			serializers = serializers.concat(serializer);
		});
		// Write the entire serializers.py
		let pySerializers = `# Django REST Libs:
from rest_framework import serializers
# Local Libs:
from .models import ${classes.join(', ')}
${serializers}`;
		// check if file already exist and ask to user
		if(fs.existsSync(path.join(appPath, 'serializers.py'))){
			vscode.window.showInformationMessage(
				`There is already a serializers.py - Erase it?`,
				...["Yes", "No"]
			)
			.then((answer) => {
				if (answer == "No"){
				vscode.window.showErrorMessage('Abortion.');
				};
				if (answer == "Yes"){
					// Writing serializers.py on app folder
					fs.writeFile(path.join(appPath, 'serializers.py'), pySerializers, (err) => {
						if (err) {
							return vscode.window.showErrorMessage(
								'Failed to create the serializers file.'
							);
						}
						vscode.window.showInformationMessage('Created serializers file.');					
					});
				};
			});
		};
	});

	/*
	Generate admin.py in an app, taking models and fields from models.py
	*/
	let appAdmin = vscode.commands.registerCommand('django-factory.createAppAdmin', async function(a=vscode.Uri) {
		// Display an error message if project folder is not open
		if (!vscode.workspace){
			return vscode.window.showErrorMessage('Please open a project folder first.');
		}
		let workplacePath = vscode.workspace.workspaceFolders[0].uri.path
		.slice(1,)
		.toString();

		// Display an error message if it's not a django project
		if (!fs.existsSync(`${workplacePath}/manage.py`)){
			return vscode.window.showErrorMessage('Please open a django project.');
		}
		// Display an error message if models.py doesn't exist in app
		let appPath = a.path.slice(1,);
		let modelsPath = path.join(appPath, 'models.py')
		if (! fs.existsSync(modelsPath)){
			return vscode.window.showErrorMessage('There is no models.py file in this app.')
		}
		// read models.py file
		let list;
		let classes = [];
		let data = fs.readFileSync(modelsPath, {encoding:'utf-8', flag:'r'});
		list = data.split('\n');
		list.forEach(function (item, index) {
			try {
				if (item.slice(0, 5) == 'class'){
					let classe;
					classe = item;
					classe = classe.split(' ')[1];
					classe = classe.split(':')[0];
					classe = classe.split('(')[0];
					classes.push(classe);
				}
			} catch (error) {
			}
		});
		let fields = [];
		let fields_list = data.split('class').slice(1, );
		fields_list.forEach(function (item, index){
			fields.push([]);
			let fields_from_class = item.split("\n");
			fields_from_class.forEach(function (field_class, index_field){
				try {
					if (field_class.includes("=")){
						let field;
						field = field_class;
						field = field.split("=")[0];
						field = field.replace("\t", "");
						field = field.replace("\r", "");
						field = field.replace("    ", "");
						field = field.split(" ")[0];
						fields[index].push(field);
					}
				} catch (error) {
				}
			});
		});
		let customModels = "";
		classes.forEach(function (model, index_classe) {
			let customModel =`

class Custom${model}(admin.ModelAdmin):
	"""Allow to edit ${model} informations"""
	# list_display = ('', )
	fieldsets = [`;
			let fields_from_classe = "";
			fields[index_classe].forEach(function (field, index_field){
				let field_from_classe = `
		('${field}', {'fields': ['${field}']}),`;
				fields_from_classe = fields_from_classe.concat(field_from_classe);
			});
			let end_class =`
	]


admin.site.register(${model}, Custom${model})
`;
		customModels = customModels.concat(customModel, fields_from_classe, end_class);
	});
	// Write the entire Admin.py
	let pyAdmin = `# Django Libs:
from django.contrib import admin
# Local Libs:
from .models import ${classes.join(', ')}
${customModels}`;

	// check if file already exist and ask to user
	if(fs.existsSync(path.join(appPath, 'admin.py'))){
		vscode.window.showInformationMessage(
			`There is already a admin.py - Erase it?`,
			...["Yes", "No"]
		)
		.then((answer) => {
			if (answer == "No"){
			vscode.window.showErrorMessage('Abortion.');
			};
			if (answer == "Yes"){
				// Writing admin.py on app folder
				fs.writeFile(path.join(appPath, 'admin.py'), pyAdmin, (err) => {
					if (err) {
						return vscode.window.showErrorMessage(
							'Failed to create the Admin file.'
							);
					}
					vscode.window.showInformationMessage('Created Admin file.');
				});
			};
		});
	};
});

	/*
	Generate forms for django app, taking models from models.py
	*/
	let appForms = vscode.commands.registerCommand('django-factory.createAppForms', async function(a=vscode.Uri) {
		// Display an error message if project folder is not open
		if (!vscode.workspace){
			return vscode.window.showErrorMessage('Please open a project folder first.');
		}
		let workplacePath = vscode.workspace.workspaceFolders[0].uri.path
		.slice(1,)
		.toString();

		// Display an error message if it's not a django project
		if (!fs.existsSync(`${workplacePath}/manage.py`)){
			return vscode.window.showErrorMessage('Please open a django project.');
		}
		// Display an error message if models.py doesn't exist in app
		let appPath = a.path.slice(1,);
		let modelsPath = path.join(appPath, 'models.py')
		if (! fs.existsSync(modelsPath)){
			return vscode.window.showErrorMessage('There is no models.py file in this app.')
		}
		// read models.py file
		let list;
		let classes = [];
		let data = fs.readFileSync(modelsPath, {encoding:'utf-8', flag:'r'});
		list = data.split('\n');
		list.forEach(function (item, index) {
			try {
				if (item.slice(0, 5) == 'class'){
					let classe;
					classe = item;
					classe = classe.split(' ')[1];
					classe = classe.split(':')[0];
					classe = classe.split('(')[0];
					classes.push(classe);
				}
			} catch (error) {
			}
		});
		let fields = [];
		let fields_list = data.split('class').slice(1, );
		// start enumerate all lines from a class
		fields_list.forEach(function (item, index){
			fields.push([]);
			let fields_from_class = item.split("\n");
			// list fields from model
			fields_from_class.forEach(function (field_class, index_field){
				try {
					if (field_class.includes("=")){
						let field;
						field = field_class;
						field = field.split("=")[0];
						field = field.replace("\t", "");
						field = field.replace("\r", "");
						field = field.replace("    ", "");
						field = field.split(" ")[0];
						fields[index].push(field);
					}
				} catch (error) {
				}
			});
		});
		let customModels = "";
		// get models' classes from models.py
		classes.forEach(function (model, index_classe) {
			let customModel =`
			
class ${model}Form(forms.Form):
	"""Surcharge the class ${model} to put place holder
	and remove help_text."""`;
			let fields_from_classe = "";
			// get all fields from a class
			fields[index_classe].forEach(function (field, index_field){
				let field_from_classe = `
	${field} = forms.Field(label="")`;
				fields_from_classe = fields_from_classe.concat(field_from_classe);
			});
			customModels = customModels.concat(customModel, fields_from_classe, '\n');
		});
		// Write the entire Form.py
		let pyForm = `# Django Libs:
from django import forms
${customModels}`;
		// check if file already exist and ask to user
		if(fs.existsSync(path.join(appPath, 'forms.py'))){
			vscode.window.showInformationMessage(
				`There is already a forms.py - Erase it?`,
				...["Yes", "No"]
			)
			.then((answer) => {
				if (answer == "No"){
				vscode.window.showErrorMessage('Abortion.');
				};
				if (answer == "Yes"){
					// Writing forms.py on app folder
					fs.writeFile(path.join(appPath, 'forms.py'), pyForm, (err) => {
						if (err) {
							return vscode.window.showErrorMessage(
								'Failed to create the Form file.'
								);
							}
							vscode.window.showInformationMessage('Created Form file.');
					});
				};
			});
		};
	});

		/*
		Generate urls.py for an django app, taking function from views.py
		*/
		let appUrls = vscode.commands.registerCommand('django-factory.createAppUrls', async function(a=vscode.Uri) {
			// Display an error message if project folder is not open
			if (!vscode.workspace){
				return vscode.window.showErrorMessage('Please open a project folder first.');
			}
			let workplacePath = vscode.workspace.workspaceFolders[0].uri.path
			.slice(1,)
			.toString();
	
			// Display an error message if it's not a django project
			if (!fs.existsSync(`${workplacePath}/manage.py`)){
				return vscode.window.showErrorMessage('Please open a django project.');
			}
			// Display an error message if views.py doesn't exist in app
			let appPath = a.path.slice(1,);
			let viewsPath = path.join(appPath, 'views.py')
			if (! fs.existsSync(viewsPath)){
				return vscode.window.showErrorMessage('There is no views.py file in this app.')
			}
			// read views.py file
			let list;
			let defs = [];
			let data = fs.readFileSync(viewsPath, {encoding:'utf-8', flag:'r'});
			list = data.split('\n');
			// get def lines
			list.forEach(function (item, index) {
				try {
					if (item.slice(0, 3) == 'def'){
						let def;
						def = item;
						def = def.split(' ')[1];
						def = def.split(':')[0];
						def = def.split('(')[0];
						defs.push(def);
					}
				} catch (error) {
				}
			});
			let urls = [];
			// Append each def name in urls
			defs.forEach(function (item, index) {
			let url = `\tpath('${item}/', views.${item}, name='${item}'),`;
			urls.push(url);
			});
			// Write the entire urls.py
			let pyUrls = `# Django Libs:
from django.urls import path
# Local Libs:
from . import views


urlpatterns = [
${urls.join('\n')}
]
`;
			if(fs.existsSync(path.join(appPath, 'urls.py'))){
				vscode.window.showInformationMessage(
					`There is already a urls.py - Erase it?`,
					...["Yes", "No"]
				)
				.then((answer) => {
					if (answer == "No"){
					vscode.window.showErrorMessage('Abortion.');
					};
					if (answer == "Yes"){
						// Writing serailizers.py on templates folder
						fs.writeFile(path.join(appPath, 'urls.py'), pyUrls, (err) => {
							if (err){
								return vscode.window.showErrorMessage(
									'Failed to create the Urls file.'
									);
								}
							vscode.window.showInformationMessage('Created Urls file.');
						});
					};
				});
			};
		});

		// Sub every functionnality to the context
		context.subscriptions.push(mainTemplate);
		context.subscriptions.push(appTemplate);
		context.subscriptions.push(appSerializer);
		context.subscriptions.push(appAdmin);
		context.subscriptions.push(appForms);
		context.subscriptions.push(appUrls);
	}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
