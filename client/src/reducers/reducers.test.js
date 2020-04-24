import * as types from "../actions/types";
import authReducer from "./authReducer";
import errReducer from "./errReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import inboxReducer from "./inboxReducer";

describe("alertReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {};
  });

  it("returns initial state", () => {
    expect(alertReducer(undefined, {})).toEqual(initialState);
  });

  it("sets new alert", () => {
    expect(
      alertReducer(initialState, { type: types.GET_ALERTS, payload: "test" })
    ).toEqual("test");
  });

  it("clears alert", () => {
    const state = "test";
    expect(alertReducer(state, { type: types.CLEAR_ALERTS })).toEqual(
      initialState
    );
  });
});

describe("authReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      user: {},
      isAuthenticated: false,
    };
  });

  it("returns initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("sets current user", () => {
    expect(
      authReducer(initialState, {
        type: types.SET_CURRENT_USER,
        payload: "userToken",
      })
    ).toEqual({ user: "userToken", isAuthenticated: true });
  });
});

describe("errReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {};
  });

  it("returns initial state", () => {
    expect(errReducer(undefined, {})).toEqual(initialState);
  });

  it("sets errors", () => {
    expect(
      errReducer(initialState, { type: types.GET_ERRORS, payload: "error" })
    ).toEqual("error");
  });

  it("clears errors", () => {
    const state = "error";
    expect(errReducer(state, { type: types.CLEAR_ERRORS })).toEqual(
      initialState
    );
  });
});

describe("inboxReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      conversation: null,
      conversations: null,
      isLoading: false,
      prepopulate: null,
    };
  });

  it("returns initial state", () => {
    expect(inboxReducer(undefined, {})).toEqual(initialState);
  });

  it("can set inbox", () => {
    const conversations = [];
    expect(
      inboxReducer(initialState, {
        type: types.GET_INBOX,
        payload: conversations,
      })
    ).toEqual({
      ...initialState,
      conversations: [],
    });
  });

  it("can get single conversation", () => {
    const conversation = {};
    expect(
      inboxReducer(initialState, {
        type: types.GET_CONVERSATION,
        payload: conversation,
      })
    ).toEqual({
      ...initialState,
      conversation: {},
    });
  });

  it("can prepopulate the user", () => {
    const user = {};
    expect(
      inboxReducer(initialState, {
        type: types.PREPOPULATE_USER,
        payload: user,
      })
    ).toEqual({
      ...initialState,
      prepopulate: {},
    });
  });

  it("sets loading to true", () => {
    expect(inboxReducer(initialState, { type: types.IS_LOADING })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
});

describe("postReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      post: null,
      posts: null,
      isLoading: false,
    };
  });

  it("returns initial state", () => {
    expect(postReducer(undefined, {})).toEqual(initialState);
  });

  it("sets post array", () => {
    const posts = [];
    expect(
      postReducer(initialState, { type: types.GET_ALL_POSTS, payload: posts })
    ).toEqual({
      ...initialState,
      posts: [],
    });
  });

  it("sets current post", () => {
    const post = {};
    expect(
      postReducer(initialState, { type: types.GET_CURRENT_POST, payload: post })
    ).toEqual({
      ...initialState,
      post: {},
    });
  });

  it("adds a new post to posts", () => {
    const newPost = { title: "post 2" };
    initialState.posts = [];

    expect(
      postReducer(initialState, { type: types.ADD_NEW_POST, payload: newPost })
    ).toEqual({
      ...initialState,
      posts: [{ title: "post 2" }],
    });
  });

  it("sets loading state to true", () => {
    expect(postReducer(initialState, { type: types.IS_LOADING })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
});

describe("profileReducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      profile: null,
      profiles: null,
      isLoading: false,
    };
  });

  it("returns initial state", () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it("sets current profile", () => {
    const profile = {};

    expect(
      profileReducer(initialState, {
        type: types.GET_CURRENT_PROFILE,
        payload: profile,
      })
    ).toEqual({
      ...initialState,
      profile: {},
    });
  });

  it("clears current profile", () => {
    expect(
      profileReducer(initialState, { type: types.CLEAR_CURRENT_PROFILE })
    ).toEqual(initialState);
  });

  it("sets loading state to true", () => {
    expect(profileReducer(initialState, { type: types.IS_LOADING })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("sets profiles array", () => {
    const profiles = [];

    expect(
      profileReducer(initialState, {
        type: types.GET_ALL_PROFILES,
        payload: profiles,
      })
    ).toEqual({
      ...initialState,
      profiles: [],
    });
  });
});
