import {create} from 'zustand';

export const useFilmStore = create((set) => ({
  films: [], 
  setFilms: (films) => set({ films }),
  createFilm: async (newFilm) => {
    if(!newFilm.name || !newFilm.explain || !newFilm.rating) {
      return {success: false, message: "All fields are required"};
    }
    const res= await fetch('/api/', {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newFilm)
  })
    const data = await res.json();
    set((state)=>({films:[...state.films , data.data]}))
    return({success:true , message:" Film başarıyla oluşturuldu."})
  },

  fetchFilm: async ()=>{
    const res = await fetch('/api/');
    const data = await res.json();
    set({films: data.data});
  } ,

  deleteFilm: async (id) =>{
    const res = await fetch(`/api/${id}`,{
      method: "DELETE"
    });
    const data = await res.json();
   
    if(data.success){
      set((state) => ({
      films: state.films.filter((film) => film._id !== id)
    }));//bunun sayesinde film silindiğinde state güncelleniyor
     return {success: true, message: "Film başarıyla silindi."};
    }else {
      return {success:false , message: data.message};
    }
    
  } ,

  updateFilm: async (id, updatedFilm) => {
    const res = await fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedFilm)
    });
    const data = await res.json();
    
    if(data.success) {
      set((state) => ({
        films: state.films.map((film) => film._id === id ? data.data : film)
      }));
      return {success: true, message: "Film başarıyla güncellendi."};
    } else {
      return {success: false, message: data.message};
    }
  } , 

 sortByRating: (order = "desc") => { 
  set((state) => ({
    films: [...state.films].sort((a, b) =>
      order === "asc" ? a.rating - b.rating : b.rating - a.rating
    ),
  }));
}

}));


