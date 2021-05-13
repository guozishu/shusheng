import React, { useEffect, useRef } from 'react';

/**
 * Create DOM element to be used as React root
 * @returns {HTMLElement}
 * @param {String} id
 */
function createRootElement(id) {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
}

/**
 * Append element as last child of body
 * @param {HTMLElement} rootElem
 */
function addRootContainer(rootElem): void {
    document.body.insertBefore(
        rootElem,
        document.body.lastElementChild?.nextElementSibling,
    );
}

function usePortal(id) {
    const rootElemRef = useRef(null);

    useEffect(() => {
        const existingParent = document.querySelector(`#${id}`);

        const parentElem = existingParent || createRootElement(id);

        if (!existingParent) {
            addRootContainer(parentElem);
        }

        parentElem.appendChild(rootElemRef.current);

        return function removeElement() {
            rootElemRef.current.remove();
            if (!parentElem.childElementCount) {
                parentElem.remove();
            }
        }
    }, [id]);

    function getRootElem() {
        if (!rootElemRef.current) {
            rootElemRef.current = document.createElement('div');
        }
        return rootElemRef.current;
    }

    return getRootElem();
}

export default usePortal;
