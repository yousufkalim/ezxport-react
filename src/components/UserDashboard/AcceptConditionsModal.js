import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';

import { useTranslation } from 'react-i18next';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AcceptConditionModal = ({ open, accepted }) => {
  const [CGUAccepted, setCGUAccepted] = useState(false);
  const [CGVAccepted, setCGVAccepted] = useState(false);
  const [RGPDAccepted, setRGPDAccepted] = useState(false);

  const { t } = useTranslation();

  const conditionAcceptedHandle = () => {
    accepted(false);
  };

  return (
    <>
      <div className="ApPlus_popup">
        <Dialog open={open} fullWidth>
          <div className="ApPlus_popup_form">
            <h1> Conditions d'utilisation </h1>

            <div className="buyer_socond">
              <div className="luyer_input_field">
                <h2 className="condition_section_title">CGU</h2>
                <p className="condition_section_content cgu">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna mi,
                  dignissim at ante in, sodales facilisis neque. Pellentesque tincidunt lorem sit
                  amet mauris pulvinar faucibus. Cras tincidunt nunc nec scelerisque hendrerit.
                  Suspendisse sed velit fringilla, pulvinar quam eu, posuere mi. Praesent sit amet
                  auctor magna, quis efficitur sapien. Nulla facilisi. Donec et rutrum tellus. Fusce
                  sagittis lacus a turpis pulvinar fermentum. Nullam odio quam, scelerisque ut felis
                  sit amet, maximus tincidunt felis. Aenean tellus sem, maximus at enim at, cursus
                  volutpat eros. Praesent at lacus diam. Curabitur efficitur eros dui, non consequat
                  justo semper in. Duis ultricies tincidunt arcu eu dictum. Proin bibendum ipsum
                  vitae varius lobortis. Nullam facilisis dui sit amet dui aliquam, id molestie
                  velit posuere. Donec interdum turpis vitae ipsum tincidunt faucibus. Suspendisse
                  lobortis aliquet ex, eu tincidunt ante. Cras ac urna fringilla, rutrum arcu sed,
                  convallis diam. Etiam luctus libero sem, id pretium nisi volutpat vel. Praesent
                  gravida, nisl non aliquet pulvinar, tellus eros pharetra sem, ac consectetur ex
                  dolor id nisi. Nullam convallis egestas nunc, sit amet mollis urna pellentesque a.
                  Phasellus eget pretium velit, in fermentum ante. Nulla auctor lectus purus,
                  suscipit iaculis leo congue vitae. Quisque posuere et dui eget gravida. Vestibulum
                  sodales ex vel elit elementum ultricies. Fusce id laoreet diam, quis convallis
                  odio. Mauris facilisis scelerisque tortor, quis finibus sem blandit sed. Nulla sit
                  amet risus ut tortor rhoncus placerat. Phasellus ultrices rutrum augue, eget
                  accumsan tellus tincidunt eget. Praesent nec quam et nulla elementum dignissim.
                  Cras eget sapien ut nunc dapibus viverra. Etiam et sollicitudin nunc, non congue
                  turpis. Vestibulum laoreet dui sit amet risus suscipit, quis vestibulum metus
                  ornare. Praesent fermentum iaculis euismod. Nulla non nisi lectus. Vivamus
                  egestas, metus quis congue posuere, urna dolor pretium quam, sit amet auctor lacus
                  enim in dolor. Proin ligula lectus, tempor sed ultrices quis, sollicitudin sed ex.
                  Proin finibus ultrices est, eget dignissim dolor bibendum id. Vestibulum neque
                  neque, consequat mattis dui sit amet, pretium rutrum justo. Donec at diam dapibus,
                  malesuada ex ac, semper quam. Morbi odio purus, malesuada sit amet massa a,
                  ultrices faucibus dui. Duis at metus dapibus, sollicitudin mauris a, mattis nisi.
                  Sed rutrum nisl ut diam finibus, auctor fringilla elit tempus. Maecenas quis velit
                  dolor. Cras varius ultricies turpis, sed suscipit enim hendrerit ut. Nam non
                  molestie urna. Vestibulum gravida, mi et vestibulum luctus, magna lacus egestas
                  diam, eu interdum sem orci in eros. Quisque fermentum porta auctor. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Proin eget blandit ante. Vestibulum ornare lectus a odio scelerisque, et auctor
                  eros elementum. Quisque id nisi felis. Maecenas rutrum erat vel augue pretium,
                  interdum dapibus elit suscipit. Pellentesque a dui a sapien luctus blandit.
                  Phasellus dignissim vestibulum nisl eget euismod. Sed non turpis tortor. Proin ac
                  erat at enim finibus suscipit. Praesent vitae nisl sem. Nam urna nisl, cursus at
                  hendrerit ut, rhoncus et libero. Nulla vulputate elit sit amet mi sollicitudin
                  accumsan. Praesent posuere suscipit lectus, ut commodo massa vulputate tempor.
                  Nulla a ante libero. Curabitur ullamcorper, lorem id aliquam iaculis, sapien diam
                  blandit arcu, a tincidunt odio mi eu magna. Morbi suscipit molestie libero, id
                  viverra tellus. Quisque lorem enim, dictum viverra viverra viverra, convallis id
                  turpis. Proin condimentum turpis purus, quis vulputate dui suscipit quis.
                </p>

                <h2 className="condition_section_title">CGV</h2>
                <p className="condition_section_content cgv">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna mi,
                  dignissim at ante in, sodales facilisis neque. Pellentesque tincidunt lorem sit
                  amet mauris pulvinar faucibus. Cras tincidunt nunc nec scelerisque hendrerit.
                  Suspendisse sed velit fringilla, pulvinar quam eu, posuere mi. Praesent sit amet
                  auctor magna, quis efficitur sapien. Nulla facilisi. Donec et rutrum tellus. Fusce
                  sagittis lacus a turpis pulvinar fermentum. Nullam odio quam, scelerisque ut felis
                  sit amet, maximus tincidunt felis. Aenean tellus sem, maximus at enim at, cursus
                  volutpat eros. Praesent at lacus diam. Curabitur efficitur eros dui, non consequat
                  justo semper in. Duis ultricies tincidunt arcu eu dictum. Proin bibendum ipsum
                  vitae varius lobortis. Nullam facilisis dui sit amet dui aliquam, id molestie
                  velit posuere. Donec interdum turpis vitae ipsum tincidunt faucibus. Suspendisse
                  lobortis aliquet ex, eu tincidunt ante. Cras ac urna fringilla, rutrum arcu sed,
                  convallis diam. Etiam luctus libero sem, id pretium nisi volutpat vel. Praesent
                  gravida, nisl non aliquet pulvinar, tellus eros pharetra sem, ac consectetur ex
                  dolor id nisi. Nullam convallis egestas nunc, sit amet mollis urna pellentesque a.
                  Phasellus eget pretium velit, in fermentum ante. Nulla auctor lectus purus,
                  suscipit iaculis leo congue vitae. Quisque posuere et dui eget gravida. Vestibulum
                  sodales ex vel elit elementum ultricies. Fusce id laoreet diam, quis convallis
                  odio. Mauris facilisis scelerisque tortor, quis finibus sem blandit sed. Nulla sit
                  amet risus ut tortor rhoncus placerat. Phasellus ultrices rutrum augue, eget
                  accumsan tellus tincidunt eget. Praesent nec quam et nulla elementum dignissim.
                  Cras eget sapien ut nunc dapibus viverra. Etiam et sollicitudin nunc, non congue
                  turpis. Vestibulum laoreet dui sit amet risus suscipit, quis vestibulum metus
                  ornare. Praesent fermentum iaculis euismod. Nulla non nisi lectus. Vivamus
                  egestas, metus quis congue posuere, urna dolor pretium quam, sit amet auctor lacus
                  enim in dolor. Proin ligula lectus, tempor sed ultrices quis, sollicitudin sed ex.
                  Proin finibus ultrices est, eget dignissim dolor bibendum id. Vestibulum neque
                  neque, consequat mattis dui sit amet, pretium rutrum justo. Donec at diam dapibus,
                  malesuada ex ac, semper quam. Morbi odio purus, malesuada sit amet massa a,
                  ultrices faucibus dui. Duis at metus dapibus, sollicitudin mauris a, mattis nisi.
                  Sed rutrum nisl ut diam finibus, auctor fringilla elit tempus. Maecenas quis velit
                  dolor. Cras varius ultricies turpis, sed suscipit enim hendrerit ut. Nam non
                  molestie urna. Vestibulum gravida, mi et vestibulum luctus, magna lacus egestas
                  diam, eu interdum sem orci in eros. Quisque fermentum porta auctor. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Proin eget blandit ante. Vestibulum ornare lectus a odio scelerisque, et auctor
                  eros elementum. Quisque id nisi felis. Maecenas rutrum erat vel augue pretium,
                  interdum dapibus elit suscipit. Pellentesque a dui a sapien luctus blandit.
                  Phasellus dignissim vestibulum nisl eget euismod. Sed non turpis tortor. Proin ac
                  erat at enim finibus suscipit. Praesent vitae nisl sem. Nam urna nisl, cursus at
                  hendrerit ut, rhoncus et libero. Nulla vulputate elit sit amet mi sollicitudin
                  accumsan. Praesent posuere suscipit lectus, ut commodo massa vulputate tempor.
                  Nulla a ante libero. Curabitur ullamcorper, lorem id aliquam iaculis, sapien diam
                  blandit arcu, a tincidunt odio mi eu magna. Morbi suscipit molestie libero, id
                  viverra tellus. Quisque lorem enim, dictum viverra viverra viverra, convallis id
                  turpis. Proin condimentum turpis purus, quis vulputate dui suscipit quis.
                </p>

                <h2 className="condition_section_title">RGPD</h2>
                <p className="condition_section_content rgpd">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna mi,
                  dignissim at ante in, sodales facilisis neque. Pellentesque tincidunt lorem sit
                  amet mauris pulvinar faucibus. Cras tincidunt nunc nec scelerisque hendrerit.
                  Suspendisse sed velit fringilla, pulvinar quam eu, posuere mi. Praesent sit amet
                  auctor magna, quis efficitur sapien. Nulla facilisi. Donec et rutrum tellus. Fusce
                  sagittis lacus a turpis pulvinar fermentum. Nullam odio quam, scelerisque ut felis
                  sit amet, maximus tincidunt felis. Aenean tellus sem, maximus at enim at, cursus
                  volutpat eros. Praesent at lacus diam. Curabitur efficitur eros dui, non consequat
                  justo semper in. Duis ultricies tincidunt arcu eu dictum. Proin bibendum ipsum
                  vitae varius lobortis. Nullam facilisis dui sit amet dui aliquam, id molestie
                  velit posuere. Donec interdum turpis vitae ipsum tincidunt faucibus. Suspendisse
                  lobortis aliquet ex, eu tincidunt ante. Cras ac urna fringilla, rutrum arcu sed,
                  convallis diam. Etiam luctus libero sem, id pretium nisi volutpat vel. Praesent
                  gravida, nisl non aliquet pulvinar, tellus eros pharetra sem, ac consectetur ex
                  dolor id nisi. Nullam convallis egestas nunc, sit amet mollis urna pellentesque a.
                  Phasellus eget pretium velit, in fermentum ante. Nulla auctor lectus purus,
                  suscipit iaculis leo congue vitae. Quisque posuere et dui eget gravida. Vestibulum
                  sodales ex vel elit elementum ultricies. Fusce id laoreet diam, quis convallis
                  odio. Mauris facilisis scelerisque tortor, quis finibus sem blandit sed. Nulla sit
                  amet risus ut tortor rhoncus placerat. Phasellus ultrices rutrum augue, eget
                  accumsan tellus tincidunt eget. Praesent nec quam et nulla elementum dignissim.
                  Cras eget sapien ut nunc dapibus viverra. Etiam et sollicitudin nunc, non congue
                  turpis. Vestibulum laoreet dui sit amet risus suscipit, quis vestibulum metus
                  ornare. Praesent fermentum iaculis euismod. Nulla non nisi lectus. Vivamus
                  egestas, metus quis congue posuere, urna dolor pretium quam, sit amet auctor lacus
                  enim in dolor. Proin ligula lectus, tempor sed ultrices quis, sollicitudin sed ex.
                  Proin finibus ultrices est, eget dignissim dolor bibendum id. Vestibulum neque
                  neque, consequat mattis dui sit amet, pretium rutrum justo. Donec at diam dapibus,
                  malesuada ex ac, semper quam. Morbi odio purus, malesuada sit amet massa a,
                  ultrices faucibus dui. Duis at metus dapibus, sollicitudin mauris a, mattis nisi.
                  Sed rutrum nisl ut diam finibus, auctor fringilla elit tempus. Maecenas quis velit
                  dolor. Cras varius ultricies turpis, sed suscipit enim hendrerit ut. Nam non
                  molestie urna. Vestibulum gravida, mi et vestibulum luctus, magna lacus egestas
                  diam, eu interdum sem orci in eros. Quisque fermentum porta auctor. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Proin eget blandit ante. Vestibulum ornare lectus a odio scelerisque, et auctor
                  eros elementum. Quisque id nisi felis. Maecenas rutrum erat vel augue pretium,
                  interdum dapibus elit suscipit. Pellentesque a dui a sapien luctus blandit.
                  Phasellus dignissim vestibulum nisl eget euismod. Sed non turpis tortor. Proin ac
                  erat at enim finibus suscipit. Praesent vitae nisl sem. Nam urna nisl, cursus at
                  hendrerit ut, rhoncus et libero. Nulla vulputate elit sit amet mi sollicitudin
                  accumsan. Praesent posuere suscipit lectus, ut commodo massa vulputate tempor.
                  Nulla a ante libero. Curabitur ullamcorper, lorem id aliquam iaculis, sapien diam
                  blandit arcu, a tincidunt odio mi eu magna. Morbi suscipit molestie libero, id
                  viverra tellus. Quisque lorem enim, dictum viverra viverra viverra, convallis id
                  turpis. Proin condimentum turpis purus, quis vulputate dui suscipit quis.
                </p>
                <FormControl fullWidth>
                  <FormControlLabel
                    className="accept_condition_checkbox"
                    control={<Checkbox onChange={e => setCGUAccepted(e.target.checked)} />}
                    label={t('Accept CGU')}
                  />
                  <FormControlLabel
                    className="accept_condition_checkbox"
                    control={<Checkbox onChange={e => setCGVAccepted(e.target.checked)} />}
                    label={t('Accept CGV')}
                  />
                  <FormControlLabel
                    className="accept_condition_checkbox"
                    control={<Checkbox onChange={e => setRGPDAccepted(e.target.checked)} />}
                    label={t('Accept RGPD')}
                  />
                </FormControl>
              </div>
              <button
                disabled={!(CGUAccepted && CGVAccepted && RGPDAccepted)}
                onClick={conditionAcceptedHandle}
                className="luyer_button">
                {t('To Confirm')}
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default AcceptConditionModal;
