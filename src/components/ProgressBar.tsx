export const ProgressBar = ({ progress }) => {
  const style = `
  .progress {
    height: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    }
    .progress-bar {
        float: left;
        width: 0%;
        height: 100%;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        background-color: #337ab7;
        -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
        box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
        -webkit-transition: width .6s ease;
        -o-transition: width .6s ease;
        transition: width .6s ease;
    }
  `;

  if (progress == 0) {
    return (
      <>
        <style>{style}</style>
        <div hx-target="this" hx-swap="outerHTML">
          <h3>Start Progress</h3>
          <button class="btn" hx-post="/example/job/start">
            Start Job
          </button>
        </div>
      </>
    );
  } else if (progress > 0 && progress < 100) {
    return (
      <>
        <style>{style}</style>
        <div
          hx-trigger="done"
          hx-get="/job"
          hx-swap="outerHTML"
          hx-target="this"
          class=""
        >
          <h3 role="status" id="pblabel" tabindex="-1" autofocus="">
            Running
          </h3>

          <div
            hx-get="/job/progress"
            hx-trigger="every 600ms"
            hx-target="this"
            hx-swap="innerHTML"
            class=""
          >
            <div
              class="progress"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={`${progress}`}
              aria-labelledby="pblabel"
            >
              <div
                id="pb"
                class="progress-bar"
                style={`width:${progress}%`}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (progress == 100) {
    return (
      <>
        <style>{style}</style>
        <div
          hx-trigger="done"
          hx-get="/job"
          hx-swap="outerHTML"
          hx-target="this"
          class=""
        >
          <h3 role="status" id="pblabel" tabindex="-1" autofocus="">
            Complete
          </h3>

          <div
            hx-get="/job/progress"
            hx-trigger="none"
            hx-target="this"
            hx-swap="innerHTML"
          >
            <div
              class="progress"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={`${progress}`}
              aria-labelledby="pblabel"
            >
              <div
                id="pb"
                class="progress-bar"
                style={`width: ${progress}%`}
              ></div>
            </div>
          </div>

          <button
            id="restart-btn"
            class="btn show"
            hx-post="/example/job/start"
            classes="add show:600ms"
          >
            Restart Job
          </button>
        </div>
      </>
    );
  } else {
    return <>no progress</>;
  }
};

// app.post("...start")したら、この値が更新される
let progress = 0;
