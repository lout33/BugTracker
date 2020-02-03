import i18n from "i18next";

import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          Login: "Login",
          "Create an account": "Create an account",
          Register: "Register",
          "Sign In As": "Sign In As",
          "Demo User": "Demo User",
          "Sign In": "Sign In",
          "Have an account": "Have an account",
          Admin: "Admin",
          "Project Manager": "Project Manager",
          Developer: "Developer",
          Submitter: "Submitter",
          Welcome: "Welcome",
          Dashboard: "Dashboard",
          "Manage Role Assignment": "Manage Role Assignment",
          "Manage Projects Users": "Manage Projects Users",
          "My projects": "My projects",
          "My tickets": "My tickets",
          "Logged in as": "Logged in as",
          "Log out": "Log out",
          "Tickets by Priority": "Tickets by Priority",
          "All the tickets classify by priority":
            "All the tickets classify by priority",
          "Tickets by Type": "Tickets by Type",
          "All the tickets classify by type":
            "All the tickets classify by type",
          "Tickets By Status": "Tickets By Status",
          "All the tickets classify by status":
            "All the tickets classify by status",
          "Tickets assigned to Developers": "Tickets assigned to Developers",
          "All the tickets assigned to a developer":
            "All the tickets assigned to a developer",
          //Role Assigment
          "Create New User or Personnel": "Create New User or Personnel",
          "Add Personnel": "Add Personnel",
          Close: "Close",
          "List of users to assign role": "List of users to assign role",
          "Select role to assign": "Select role to assign",
          Select: "Select",
          developer: "developer",
          submitter: "submitter",
          manager: "manager",
          "Assign Role": "Assign Role",
          "Your Personnel": "Your Personnel",
          "All your personnel in your database":
            "All your personnel in your database",
          Username: "Username",
          Email: "Email",
          Role: "Role",
          Delete: "Delete",
          pages: "pages",
          //Project Assigment

          "List of projects": "List of projects",
          "List of my perssonel": "List of my perssonel",
          "Assign Project": "Assign Project",

          "User assigned to": "User assigned to",
          // My projetcs
          "Create New Project": "Create New Project",
          "New Project": "New Project",
          "Create project and close": "Create project and close",
          "Your Projects": "TYour Projects",
          "All your projects in your database":
            "All your projects in your database",
          Project: "Project",
          Description: "Description",
          Details: "Details",
          details: "details",
          // My projetcs Details
          "Details for this project": "Details for this project",
          "Back to list": "Back to list",
          "Project Name": "Project Name",
          "Project Description": "Project Description",
          "Assigned Personel": "Assigned Personel",
          "All your comments for this tickets":
            "All your comments for this tickets",
          "All your personnel for this project":
            "All your personnel for this project",
          "All your tickets for this project":
            "All your tickets for this project",
          "Tickets for This project": "Tickets for This project",
          // my tickets
          "Create New Ticket": "Create New Ticket",
          "New Ticket": "New Ticket",
          "Select project to attach": "Select project to attach",
          "Create your new ticket": "Create your new ticket",
          Status: "Status",
          Priority: "Priority",
          low: "low",
          medium: "medium",
          high: "high",
          urgent: "urgent",
          Type: "Type",
          Bug: "Bug",
          Error: "Error",
          Feature: "Feature",
          Request: "Request",
          Inquiry: "Inquiry",
          Question: "Question",
          "Create ticket and Close": "Create ticket and Close",
          "Your Tickets": "tus tickets",
          "All your Tickets in your database":
            "All your Tickets in your database",
          title: "title",
          projectName: "projectName",
          assignedDeveloper: "assignedDeveloper",
          priority: "priority",
          status: "status",
          type: "type",
          createdAt: "createdAt",
          details: "details",
          edit: "edit",
          "Details for this ticket": "Details for this ticket",
          "Ticket Title": "Ticket Title",
          "Ticket Description": "Ticket Description",
          "Assigned Developer": "Assigned Developer",
          Submiter: "Submiter",
          Project: "Project",
          "Ticket Priority": "Ticket Priority",
          "Ticket Status": "Ticket Status",
          "Ticket Type": "Ticket Type",
          Created: "Created",
          Updated: "Updated",
          "Tickets History": "Tickets History",
          "All history information for this ticket":
            "All history information for this ticket",
          Property: "Property",
          "Old Value": "Old Value",
          "New Value": "New Value",
          "Data Changed": "Data Changed",
          "Add a comment": "Add a comment",
          Add: "Add",
          "Tickets Comments": "Tickets Comments",
          "All your cooments for this tickets":
            "All your cooments for this tickets",
          Commenter: "Commenter",
          Message: "Message",
          "Created at": "Created at",
          "Change Status": "Change Status",
          //Attachment
          "Add a Attachment": "Add a Attachment",
          "Click Here": "Click Here",
          "To add your images": "To add your images",
          File: "File",
          Uploader: "Uploader",
          Image: "Image",
          "View Image": "View Image",
          "Assign Ticket to Developer": "Assign Ticket to Developer",
          Assign: "Assign",
          "Assign Ticket To Dev": "Assign Ticket To Dev",
          "Pick your ticket": "Pick your ticket",
          "Pick your dev": "Pick your dev",
          "Assing and close": "Assing and close",
          "All files attached to this ticket":
            "All files attached to this ticket"
        }
      },
      es: {
        translations: {
          Login: "Iniciar Sesion",
          "Create an account": "Crear una cuenta",
          Register: "Registrate",
          "Sign In As": "Inciar sesion como",
          "Demo User": "Usuario Demo",
          "Sign In": "Registrarse",
          "Have an account": "Tienes una cuenta",
          Admin: "Administrador",
          "Project Manager": "Jefe de proyecto",
          Developer: "Desarrollador",
          Submitter: "Reportador",
          Welcome: "Bienvenido",
          Dashboard: "Reportes",
          "Manage Role Assignment": "Asignacion de Roles ",
          "Manage Projects Users": "Asignacion de Proyectos ",
          "My projects": "Mis Proyectos",
          "My tickets": "Mi tickets",
          "Logged in as": "Conectado como",
          "Log out": "Salir",
          "Tickets by Priority": "Tickets por prioridad",
          "All the tickets classify by priority":
            "Todos los tickets clasificados por prioridad",
          "Tickets by Type": "Tickets por tipo",
          "All the tickets classify by type":
            "Todos los tickets clasificados por tipo",
          "Tickets By Status": "Tickets por estatus",
          "All the tickets classify by status":
            "Todos los tickets clasificados por status",
          "Tickets assigned to Developers":
            "Tickets asignados para los desarrolladores",
          "All the tickets assigned to a developer":
            "Todos los tickets asignados a los desarrolladores",
          //Role Assigment
          "Create New User or Personnel": "Crear nuevo usuario o personal",
          "Add Personnel": "Agregar personal",
          Close: "Cerrar",
          "List of users to assign role":
            "Lista de usarios para asignarles un rol",
          "Select role to assign": "Selecciona el rol para asignar",
          Select: "Selecciona",
          developer: "desarrollador",
          submitter: "reportador",
          manager: "manager",
          "Assign Role": "Asignar role",
          "Your Personnel": "Tu personal",
          "All your personnel in your database":
            "Todo tu personal de la base de datos",
          Username: "Nombre ",
          Email: "Email",
          Role: "Rol",
          Delete: "Borrar",
          pages: "paginas",
          //Project Assigment
          "List of projects": "Lista de proyectos",
          "List of my perssonel": "Lista de mi personal",
          "Assign Project": "Asignar proyecto",
          "User assigned to": "Usuario asignado a",
          // My projetcs
          "Create New Project": "Crear Nuevo Proyecto",
          "New Project": "Nuevo Proyecto",
          "Create project and close": "Crear proyecto y cerrar",
          "Your Projects": "Tus Proyectos",
          "All your projects in your database":
            "Todos tus proyectos en mi database",
          Project: "Proyecto",
          Description: "Descripcion",
          Details: "Detalles",
          details: "detalles",
          // My projetcs Details
          "Details for this project": "Detalles para este proyecto",
          "Back to list": "Regresar a la lista",
          "Project Name": "Nombre del proyecto",
          "Project Description": "Descripcion del proyecto",
          "Assigned Personel": "Asignado Personal",
          "All your comments for this tickets":
            "Todos tus comentarios para este ticket",
          "All your personnel for this project":
            "Todo tu personal para este proyecto",
          "All your tickets for this project":
            "Todos tus tickets para este proyecto",
          "Tickets for This project": "Tickets para este proyecto",
          // my tickets
          "Create New Ticket": "Crear Nuevo Ticket",
          "New Ticket": "Nuevo Ticket",
          "Select project to attach": "Selecciona el proyecto a adjuntar",
          "Create your new ticket": "Crea tu nuevo ticket",
          Status: "Estado",
          Priority: "Prioridad",
          low: "baja",
          medium: "media",
          high: "alta",
          urgent: "urgente",
          Type: "Tipo",
          Bug: "Bug",
          Error: "Error",
          Feature: "Carasteristica",
          Request: "Pedido",
          Inquiry: "Duda",
          Question: "Pregunta",
          "Create ticket and Close": "Crear ticket y cerrar",
          "Your Tickets": "Tus tickets",
          "All your Tickets in your database":
            "Todos los tickets en tu base de datos",
          title: "titulo",
          projectName: "nombreDeProyecto",
          assignedDeveloper: "asignadoDesarrollador",
          priority: "prioridad",
          status: "estado",
          type: "tipo",
          createdAt: "creadoEn",
          edit: "editar",
          "Details for this ticket": "Detalles para este tickets",
          "Ticket Title": "Ticket Titulo",
          "Ticket Description": "Ticket Descripcion",
          "Assigned Developer": "Assignado Desarrollador",
          "Ticket Priority": "Ticket Prioridad",
          "Ticket Status": "Ticket Estado",
          "Ticket Type": "Ticket Tipo",
          Created: "Creado",
          Updated: "Actualizado",
          "Tickets History": "Historia de los Tickets ",
          "All history information for this ticket":
            "Todo el historia lde informacion de este ticket",
          Property: "Propiedad",
          "Old Value": "Viejo Valor",
          "New Value": "Nuevo Valor",
          "Data Changed": "Fecha de Cambio",
          "Add a comment": "Agregar un comentario",
          Add: "Agregar",
          "Tickets Comments": "Comentarios de los tickets",
          "All your cooments for this tickets":
            "Todos tus comentarios para este ticket",
          Commenter: "Comentador",
          Message: "Mensaje",
          "Change Status": "Cambiar Estado",
          //Attachment
          "Add a Attachment": "Agregar una imagen",
          "Click Here": "Click Aqui",
          "To add your images": "Para agregar una imagen",
          "Created at": "Creado en",
          File: "Imagen",
          Uploader: "Enviado por",
          Image: "Imagen",
          "View Image": "Ver Imagen",

          "Assign Ticket to Developer": "Asignar ticket a developer",
          Assign: "Asignar",
          "Assign Ticket To Dev": "Asignaer ticket a dev",
          "Pick your ticket": "Elije tu ticket",
          "Pick your dev": "Elije a tu dev",
          "Assing and close": "Asignar y cerrar",
          "All files attached to this ticket":
            "Todos las imagenes adjudtos a este ticket"
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ","
    },

    react: {
      wait: true,
      useSuspense: false
    }
  });
export default i18n;
