

# Recomiendo que hagan por su cuenta: 

- PUT /:workspace_id => Actualizar espacio de trabajo
- DELETE /:workspace_id/members/:member_id => Borrar miembro
- PUT /:workspace_id/members/:member_id => Actualizar miembro (por ejemplo role)
- PUT /:workspace_id/channels/:channel_id => Actualizar canal (por ejemplo el name)
- DELETE /:workspace_id/channels/:channel_id/messages/:message_id => Eliminar un mensaje (Siempre que seas admin o owner o el creador del mensaje)
- Flujo de me olvide mi contraseña
- Flujo de cambiar mi contraseña

# Extras:
- two factor authentication (2fa) (Que haya mas de un factor al iniciar sesion o autentificar cierta accion)
- Ejemplo:
    -Te pido tu password y mail, y si estan bien, te envio un codigo de 6 digitos al mail (Lo guardo en DB) y luego vos me mandas el codigo

# Estas son core y estaran en la clase:
- GET /:workspace_id => Obtener espacio de trabajo (que traiga el espacio de trabajo)
    - Tiene que ser miembro
    -Tiene que traer toda la info de cierto espacio de trabajo incluyendo nuestra membresia con ellos (o sea si soy owner, admin o miembro)
- GET /:workspace_id/channels => Obtener canales relacionados al espacio de trabajo
- PUT /:workspace_id/channels => Crear canal
- GET /:workspace_id/channels/:channel_id/messages => Obtener mensajes relacionados al canal
- PUT /:workspace_id/channels/:channel_id/messages => Crear mensaje