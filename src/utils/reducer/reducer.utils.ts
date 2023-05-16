import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
  //Funcion sin argumentos que devuelve cualquier accion
  //Extiende la funcion AC y agrega dos propiedades:
  type: ReturnType<AC>["type"]; //El tipo de esta propiedad se infiere del retorno del tipo de la funcion.
  //Es decir que el tipo de 'type' sera el mismo que el tipo de accion devuelto por la funcion AC.
  match(action: AnyAction): action is ReturnType<AC>; //Si coincide la accion con el tipo de accion retornado por AC devuelve un true.
};

//Sobre carga de funciones
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

//La funcion acepta cualquier numero de argumentos
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; //Obtener el type de una accion
  return Object.assign(actionCreator, {
    //Extender el actionCreator con nuevas propiedades y metodos
    type,
    match(action: AnyAction) {
      return action.type === type; //Si el type de la accion coincide con el type almacenado devuelve true o false
    },
  });
}

//////////////////////////////////////////////////////////////
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

//Sobrecarga de funciones
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

//Implementacion real de la funcion
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
