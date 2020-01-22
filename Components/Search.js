// Components/Search.js
import React from 'react'
import { StyleSheet,View, TextInput, Button , FlatList , Text  , ActivityIndicator} from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' 
// import { } from ... car c'est un export nommé dans TMDBApi.js
import films from '../Helpers/filmsData' ; // No need only for test static
import FilmItem from './FilmItem' ;



class Search extends React.Component {

    constructor(props) {
        super(props)
      //  this._films = []
      this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
      this.page = 0 // Compteur pour connaître la page courante
      this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
      this.state = { 
          films: [] ,
          isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche}
      }
    }

      _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
        this.setState({ isLoading: true }) // Lancement du chargement
        getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_page
         // this._films = data.results
         //this.forceUpdate()
         this.setState({ 
          // films: data.results , 
          films: [ ...this.state.films, ...data.results ], // concaténation de l'ancien tableau de film et new result 
          // this work also :   films: this.state.films.concat(data.results)
           isLoading : false  })    // Fin de chargement 
          
        })
        }
     }


      _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
      }

      _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
      }

      _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [] },
          () => {  // Represent a call back to wait until it's updated 
            //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
        })
        // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
      //  console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
      
        this._loadFilms()
      }

      _displayDetailForFilm = (idFilm) => {
      //  console.log("Display film with id " + idFilm) ;
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm }) ;
    

    }


    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput}
                           placeholder='Title of the movie '
                           onChangeText={(text) => this._searchTextInputChanged(text)}
                           onSubmitEditing={() => this._searchFilms()}
                           />
                <Button  tyle={styles.textinput} title='Search' onPress={() => this._searchFilms()}/>
                <FlatList
                            data={this.state.films}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />} 
                          onEndReachedThreshold={0.5}
                          onEndReached={() => {
                            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination 
                            //(totalPages) avant de charger plus d'éléments
                               this._loadFilms()
                            }
                        }}
                />
                 {this._displayLoading()}
           { /* This function can be replaced by this but it's not that good return null etc ..
           this.state.isLoading ?
              <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
              </View>
              : null
           */}
            </View>
        )
     }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        //marginTop: 20
      },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    } ,
    loading_container: {
      position: 'absolute',  // to be in front 
      left: 0,
      right: 0,
      top: 100,    // to give access to the input text & search button 
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

export default Search