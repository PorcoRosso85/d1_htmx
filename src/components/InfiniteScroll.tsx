export const InfiniteScroll = ({ x }: { x: number }) => {
  if (x == 1) {
    return (
      <table hx-indicator=".htmx-indicator">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agent Smith</td>
            <td>void10@null.org</td>
            <td>A7DCBG0C91</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void11@null.org</td>
            <td>E2C1D18DC6</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void12@null.org</td>
            <td>25955GAC3C</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void13@null.org</td>
            <td>B096869CF5</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void14@null.org</td>
            <td>33GE11D433</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void15@null.org</td>
            <td>D2723A1B07</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void16@null.org</td>
            <td>93C6C8B6AA</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void17@null.org</td>
            <td>G713523F20</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void18@null.org</td>
            <td>GEG03F7C0D</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void19@null.org</td>
            <td>402189DFC4</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void20@null.org</td>
            <td>433BB7CCC4</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void21@null.org</td>
            <td>F0F9E7F197</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void22@null.org</td>
            <td>2F5FF9E6C3</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void23@null.org</td>
            <td>0DG7F940G9</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void24@null.org</td>
            <td>G53A12381F</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void25@null.org</td>
            <td>643FE3E3A2</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void26@null.org</td>
            <td>8264C23FCG</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void27@null.org</td>
            <td>156A2DBBE5</td>
          </tr>
          <tr>
            <td>Agent Smith</td>
            <td>void28@null.org</td>
            <td>4C6C71AE7E</td>
          </tr>
          <tr
            hx-get="/example/contacts/page2"
            // hx-trigger="revealed"
            hx-trigger="click"
            hx-swap="afterend"
            data-hx-revealed="true"
            class=""
          >
            <td>Agent Smith</td>
            <td>void29@null.org</td>
            <td>71489F8EF9</td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return (
      <>
        <tr>
          <td>Agent Smith</td>
          <td>void30@null.org</td>
          <td>DF324D47DD</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void31@null.org</td>
          <td>FFA99873GE</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void32@null.org</td>
          <td>891859C02C</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void33@null.org</td>
          <td>581959500C</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void34@null.org</td>
          <td>CGB32F924A</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void35@null.org</td>
          <td>F1F68D51F4</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void36@null.org</td>
          <td>G35B01E064</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void37@null.org</td>
          <td>97A7D8AG48</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void38@null.org</td>
          <td>G9EF8GD631</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void39@null.org</td>
          <td>56A94A93CD</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void40@null.org</td>
          <td>5G10FG1905</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void41@null.org</td>
          <td>BCE2552GGD</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void42@null.org</td>
          <td>3835BDAB32</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void43@null.org</td>
          <td>02094EACE4</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void44@null.org</td>
          <td>51C47FE08G</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void45@null.org</td>
          <td>G38D41C7A7</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void46@null.org</td>
          <td>3D294497E8</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void47@null.org</td>
          <td>7E9G51G486</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>void48@null.org</td>
          <td>5A65A2C2D6</td>
        </tr>
        <tr
          hx-get="/contacts/?page=3"
          hx-trigger="revealed"
          hx-swap="afterend"
          data-hx-revealed="true"
          class=""
        >
          <td>Agent Smith</td>
          <td>void49@null.org</td>
          <td>438897EG1B</td>
        </tr>
      </>
    );
    //   } else if (x == 3) {
    //     return (
    //       <>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void50@null.org</td>
    //           <td>F749C4EF95</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void51@null.org</td>
    //           <td>64G2D5648B</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void52@null.org</td>
    //           <td>E9A426A357</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void53@null.org</td>
    //           <td>58A1919DA9</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void54@null.org</td>
    //           <td>6760C58C5A</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void55@null.org</td>
    //           <td>3G75EB48C7</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void56@null.org</td>
    //           <td>A24123D261</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void57@null.org</td>
    //           <td>885C4EGA2A</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void58@null.org</td>
    //           <td>8GG4549467</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void59@null.org</td>
    //           <td>F1F353EFD9</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void60@null.org</td>
    //           <td>GBFEE8B37G</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void61@null.org</td>
    //           <td>D8BD61E07F</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void62@null.org</td>
    //           <td>21CD48G93B</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void63@null.org</td>
    //           <td>ADDF0DF098</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void64@null.org</td>
    //           <td>AE67DCA9F6</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void65@null.org</td>
    //           <td>FF802371E3</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void66@null.org</td>
    //           <td>D3F6CF0748</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void67@null.org</td>
    //           <td>9BD0E08CD2</td>
    //         </tr>
    //         <tr>
    //           <td>Agent Smith</td>
    //           <td>void68@null.org</td>
    //           <td>4DGB65BDDE</td>
    //         </tr>
    //         <tr hx-get="/contacts/?page=4" hx-trigger="revealed" hx-swap="afterend">
    //           <td>Agent Smith</td>
    //           <td>void69@null.org</td>
    //           <td>C589A1224B</td>
    //         </tr>
    //       </>
    //     );
  }
};
