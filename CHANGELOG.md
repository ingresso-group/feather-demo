## Change log

##  [0.2.7] - 2021-05-06
### Updated
- Update to feather v0.4.7

##  [0.2.6] - 2021-04-14
### Updated
- Update to feather v0.4.6

##  [0.2.5] - 2021-03-12
### Updated
- Update to feather v0.4.5

##  [0.2.4] - 2021-02-18
### Updated
- Update to feather v0.4.4

##  [0.2.3] - 2021-02-12
### Updated
- Update default perf to be from 2022 instead of 2020

##  [0.2.2] - 2019-06-03
### Security
- Patch security vulnerability in axios

##  [0.2.1](https://storage.googleapis.com/ticketswitch/feather/0.2.1/feather.min.js) - 2018-06-29
### Added
- added a handler for 404 errors: this can be handled in any way is deemed reasonable, but at least they won't show an preloader with an unrelated page underneath anymore

##  [0.2.0](https://storage.googleapis.com/ticketswitch/feather/0.2.0/feather.min.js) - 2017-11-30
### Added
- added possibility to specify a custom legend
- changed the way the initial performance is selected (removed it from the url and instead passed it as a regular **selectPerformance** call

##  [0.1.2](https://storage.googleapis.com/ticketswitch/feather/0.1.2/feather.min.js) - 2017-11-28
### Added
- added possibility to set a custom preloader

##  [0.1.1](https://storage.googleapis.com/ticketswitch/feather/0.1.1/feather.min.js) - 2017-11-23
### Added
- added setPreloader method
- added a flag for forcing controls to always show, even on small screens


##  [0.1.0](https://storage.googleapis.com/ticketswitch/feather/0.1.0/feather.min.js) - 2017-11-13
### Added
- force 'choose num tickets' ab test to false


##  [0.0.17](https://storage.googleapis.com/ticketswitch/feather/0.0.17/feather.min.js) - 2017-11-06
### Added
- added functionality to programatically select seats

##  [0.0.16](https://storage.googleapis.com/ticketswitch/feather/0.0.16/feather.min.js) - 2017-10-10
### Fixed
- silenced the 'missing token' warning when silenceWarnings is set to true


##  [0.0.15](https://storage.googleapis.com/ticketswitch/feather/0.0.15/feather.min.js) - 2017-10-10
### Added
- added availabilityURL to config parameters, allowing people to specify a custom endpoing for getting availability data


##  [0.0.14](https://storage.googleapis.com/ticketswitch/feather/0.0.14/feather.min.js) - 2017-09-28
### Fixed
- fixed CSS margin of the iframe


##  [0.0.13](https://storage.googleapis.com/ticketswitch/feather/0.0.13/feather.min.js) - 2017-09-27
### Fixed
- fixed CSS margin of the iframe

##  [0.0.12](https://storage.googleapis.com/ticketswitch/feather/0.0.12/feather.min.js) - 2017-09-22
### Fixed
- fixed infinite refresh loop


##  [0.0.11](https://storage.googleapis.com/ticketswitch/feather/0.0.11/feather.min.js) - 2017-09-22
### Fixed
- fixed issue with Feather not loading when coming back from checkout page


##  [0.0.9](https://storage.googleapis.com/ticketswitch/feather/0.0.9/feather.min.js) - 2017-09-14
### Changed
- Updated the documentation URL that is displayed in the console when Feather is not initialised/used correctly

### Added
- Added unit tests


##  [0.0.9](https://storage.googleapis.com/ticketswitch/feather/0.0.9/feather.min.js) - 2017-09-14
### Changed
- Updated the documentation URL that is displayed in the console when Feather is not initialised/used correctly

### Added
- Added unit tests


##  [0.0.8](https://storage.googleapis.com/ticketswitch/feather/0.0.8/feather.min.js) - 2017-09-14
### Added
- added functions: disableScrollToZoom and disableInitialZoom
- offers displayed in the legend now use a branded colour, instead of being hardcoded to red


##  [0.0.7](https://storage.googleapis.com/ticketswitch/feather/0.0.7/feather.min.js) - 2017-09-06
### Added
- added a protection against invalid messages, caused by external libraries/browser extensions

### Fixed
- fixed some IE-specific errors

##  [0.0.6](https://storage.googleapis.com/ticketswitch/feather/0.0.6/feather.min.js) - 2017-09-06
### Fixed
- Fixed a syntax error
