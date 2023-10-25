export const Tabs = () => {
  return (
    <div
      id="tabs"
      hx-get="/example/tabs/tab1"
      hx-trigger="load delay:100ms"
      hx-target="#tabs"
      hx-swap="innerHTML"
    ></div>
  );
};

const tabContentsData = {
  tab1: "1",
  tab2: "2",
  tab3: "3",
};

export const TabContents = ({ tab }) => {
  return (
    <>
      <div class="tab-list" role="tablist">
        <button
          hx-get="/example/tabs/tab1"
          class="selected"
          role="tab"
          aria-selected="false"
          aria-controls="tab-content"
        >
          Tab 1
        </button>
        <button
          hx-get="/example/tabs/tab2"
          role="tab"
          aria-selected="false"
          aria-controls="tab-content"
        >
          Tab 2
        </button>
        <button
          hx-get="/example/tabs/tab3"
          role="tab"
          aria-selected="false"
          aria-controls="tab-content"
        >
          Tab 3
        </button>
      </div>
      <div id="tab-content" role="tabpanel" class="tab-content">
        {tabContentsData[tab]}
      </div>
    </>
  );
};
