import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2453',  // Color principal de Banco Guayaquil
  },
  container: {
    width: '90%',
padding: 40,
backgroundColor: 'rgba(240, 255, 240, 0.5)', // Fondo transparente
borderRadius: 50,
alignItems: 'center',
shadowColor: '#2b2453',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 2.25,
shadowRadius: 6.84,
elevation: 7,
    transform: [{ translateY: -30 }], // Efecto de elevación
  },
  logo: {
    width: 130, // Ajusta el ancho según la relación de aspecto de tu logo
    height: 130, // Ajusta la altura según la relación de aspecto de tu logo
    marginBottom: 40,
    resizeMode: 'contain', // Ajusta la escala de la imagen
  },
  title: {
    fontSize: 40,
    marginBottom: 25,
    textAlign: 'center',
    color: '#2b2453',  
    fontFamily: 'system-ui',
    fontWeight: 100,// Verde oscuro de Banco Guayaquil
   /*  fontWeight: 'bolder', */
  },
  input: {
    height: 36,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#2b2453', // Borde gris claro
    borderRadius: 10,
    backgroundColor: '#E0E0E0', // Fondo gris claro
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,

  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2453', // Verde oscuro de Banco Guayaquil
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#2b2453', // Texto blanco
    fontSize: 30,
    fontWeight: 'bold',
  },
  forgotPasswordText:{
    color:'#2b2453',
    textAlign:'justify',
    fontSize:'15%',
    height:40,
    fontFamily: 'system-ui',
  },
  signUpText:{
    color:'#2b2453',
    textAlign:'justify',
    fontSize:'15%',
    fontFamily: 'system-ui',
  },
 
});
