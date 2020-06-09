/* global JitsiMeetJS config*/
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import AirClass from './components/AirClass';
import Header from './components/Header';
import './App.css';
import $ from 'jquery';
import { PageSession } from './components/PageSession';
import { ConnectForm } from './components/ConnectForm';
import { Audio } from './components/Audio';
import useWindowSize from './hooks/useWindowSize';
import qs from 'qs';

window.$ = $;

const connect = async ({ domain, room, config }) => {
  const connectionConfig = Object.assign({}, config);
  let serviceUrl = connectionConfig.websocket || connectionConfig.bosh;

  serviceUrl += `?room=${room}`;

  connectionConfig.serviceUrl = connectionConfig.bosh = serviceUrl;

  return new Promise((resolve, reject) => {
    const connection = new JitsiMeetJS.JitsiConnection(
      null,
      undefined,
      connectionConfig
    );

    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      () => resolve(connection)
    );
    
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      reject
    );
    connection.connect();
  });
};

const join = async ({ connection, room }) => {
  const conference = connection.initJitsiConference(room, {});

  return new Promise((resolve) => {
    conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () =>
      resolve(conference)
    );
    conference.join();
  });
};

const connectandJoin = async ({ domain, room, config }) => {
  const connection = await connect({ domain, room, config });
  const localTracks = await JitsiMeetJS.createLocalTracks(
    { devices: ['video', 'audio'], facingMode: 'user' },
    true
  );

  const conference = await join({ connection, room });
  const localTrack = localTracks.find((track) => track.getType() === 'video');
  conference.addTrack(localTrack);
  const localAudioTrack = localTracks.find(
    (track) => track.getType() === 'audio'
  );
  conference.addTrack(localAudioTrack);

  return { connection, conference, localTrack };
};

const loadAndConnect = ({ domain, room }) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = () => {
      JitsiMeetJS.init();

      const configScript = document.createElement('script');
      configScript.src = `https://${domain}/config.js`;
      document.querySelector('head').appendChild(configScript);
      configScript.onload = () => {
        connectandJoin({ domain, room, config }).then(resolve);
      };
    };

    script.src = `https://${domain}/libs/lib-jitsi-meet.min.js`;
    document.querySelector('head').appendChild(script);
  });
};

const useTracks = () => {
  const [tracks, setTracks] = useState([]);

  const addTrack = useCallback(
    (track) => {
      setTracks((tracks) => {
        const hasTrack = tracks.find(
          (_track) => track.getId() === _track.getId()
        );

        if (hasTrack) return tracks;

        return [...tracks, track];
      });
    },
    [setTracks]
  );

  const removeTrack = useCallback(
    (track) => {
      setTracks((tracks) =>
        tracks.filter((_track) => track.getId() !== _track.getId())
      );
    },
    [setTracks]
  );

  return [tracks, addTrack, removeTrack];
};

const getDefaultParamsValue = () => {
  const params =
    document.location.search.length > 1
      ? qs.parse(document.location.search.slice(1))
      : {};
  // debugger;
  return {
    room: params.room ?? 'room1234_test',
    domain: params.domain ?? 'meet.jit.si',
    autoJoin: params.autojoin ?? false,
  };
};

function App() {
  const defaultParams = useMemo(getDefaultParamsValue, []);

  const [mainState, setMainState] = useState('init');
  const [domain, setDomain] = useState(defaultParams.domain);
  const [room, setRoom] = useState(defaultParams.room);
  const [conference, setConference] = useState(null);
  const [videoTracks, addVideoTrack, removeVideoTrack] = useTracks();
  const [audioTracks, addAudioTrack, removeAudioTrack] = useTracks();

  const addTrack = useCallback(
    (track) => {
      if (track.getType() === 'video') addVideoTrack(track);
      if (track.getType() === 'audio') addAudioTrack(track);
    },
    [addVideoTrack, addAudioTrack]
  );

  const removeTrack = useCallback(
    (track) => {
      if (track.getType() === 'video') removeVideoTrack(track);
      if (track.getType() === 'audio') removeAudioTrack(track);
    },
    [removeAudioTrack, removeVideoTrack]
  );

  const connect = useCallback(
    async (e) => {
      e && e.preventDefault();
      setMainState('loading');
      const { connection, conference, localTrack } = await loadAndConnect({
        domain,
        room,
      });
      setMainState('started');
      setConference(conference);
      addTrack(localTrack);
    },
    [addTrack, domain, room]
  );

  useEffect(() => {
    if (!conference) return;

    conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, addTrack);
    conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, removeTrack);
  }, [addTrack, conference, removeTrack]);

  useEffect(() => {
    if (defaultParams.autoJoin || defaultParams.autoJoin === '') {
      connect();
    }
  }, [connect, defaultParams.autoJoin]);

  useEffect(() => {
    console.log({ videoTracks });
  }, [videoTracks]);

  return (
    <div className="App">
      {mainState === 'init' && (
        <header className="App-header">
          <ConnectForm
            connect={connect}
            domain={domain}
            room={room}
            setRoom={setRoom}
            setDomain={setDomain}
          />
        </header>
      )}
      {mainState === 'loading' && 'Loading'}
      {mainState === 'started' && (
        <>
          <Header />
          <AirClass />
        </>
      )}
    </div>
  );
}

export default App;
