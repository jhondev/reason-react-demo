[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

type state =
  | LoadingDogs
  | ErrorFetchingDogs
  | LoadedDogs(array(string));

[@react.component]
let make = () => {
  let (state, setState) = React.useState(() => LoadingDogs);

  let loadDogs = () => {
    setState(_ => LoadingDogs);
    Js.Promise.(
      fetch("https://dog.ceo/api/breeds/image/random/3")
      |> then_(response => response##json())
      |> then_(jsonResponse => {
           setState(_previousState => LoadedDogs(jsonResponse##message));
           Js.Promise.resolve();
         })
      |> catch(_err => {
           setState(_previousState => ErrorFetchingDogs);
           Js.Promise.resolve();
         })
      |> ignore
    );
    // Returning None, instead of Some(() => ...), means we don't have any
    // cleanup to do before unmounting. That's not 100% true. We should
    // technically cancel the promise. Unofortunately, there's currently no
    // way to cancel a promise. Promises in general should be way less used
    // for React components; but since folks do use them, we provide such an
    // example here. In reality, this fetch should just be a plain callback,
    // with a cancellation API
  };

  React.useEffect0(_ => {
    loadDogs();
    None;
  });

  <div
    style={ReactDOMRe.Style.make(
      ~height="120px",
      ~display="flex",
      ~alignItems="center",
      ~justifyContent="center",
      (),
    )}>
    {switch (state) {
     | ErrorFetchingDogs => React.string("An error occurred!")
     | LoadingDogs => React.string("Loading...")
     | LoadedDogs(dogs) =>
       <div>
         {dogs
          ->Belt.Array.mapWithIndex((i, dog) => {
              let imageStyle =
                ReactDOMRe.Style.make(
                  ~display="inline-block",
                  ~height="120px",
                  ~width="120px",
                  ~marginRight=
                    i === Js.Array.length(dogs) - 1 ? "0px" : "8px",
                  ~borderRadius="8px",
                  ~boxShadow="0px 4px 16px rgb(200, 200, 200)",
                  ~backgroundSize="cover",
                  ~backgroundImage={j|url($dog)|j},
                  ~backgroundPosition="center",
                  (),
                );
              <div key=dog style=imageStyle />;
            })
          ->React.array}
         <button onClick={_ => loadDogs()}>
           {React.string("Refresh dogs")}
         </button>
       </div>
     }}
  </div>;
};
