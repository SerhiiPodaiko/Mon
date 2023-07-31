#!/bin/bash
###############################################################################

###############################################################################

ACTION=""
if [ ${#} -ge 1 ]; then
  ACTION=${1} ; shift
fi

case "${ACTION}" in

  ''|-*)
    # Production
    # shellcheck disable=SC2068
    # shellcheck disable=SC2086
    exec npm run start "${ACTION}" ${@}
    ;;

  dev)
    # Use for development
    # shellcheck disable=SC2068
    exec npm run "${ACTION}" ${@}
    ;;

  *)
    # shellcheck disable=SC2068
    exec "${ACTION}" ${@}
    ;;

esac