<template>
  <div class="mx-auto px-2 sm:px-4 md:px-5">
    <h1 class="text-2xl font-semibold text-gray-900">Anasayfa</h1>
  </div>



  <div class="mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">

    <main class="lg:col-span-9 xl:col-span-8">

      <div class="flex flex-wrap w-full">
        <div class="w-full">
          <UiDataTable
              size="medium"
              :api="'json/sales-list.json'"
              :apiOpts="{ method: 'GET', body: {  } }"
              :config="config"
              title="Acil Bekleyenler"
              titleIcon="la-ticket"
          >

            <template #name="item">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" :src="item.image_url" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm text-gray-500">
                    {{ item.code }}
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ item.attributes[0].value }}
                  </div>
                </div>
              </div>
            </template>

            <template #status="item">
              <div class=" text-white text-sm w-20 rounded-md h-6 leading-6 text-center"
                   :style="{ backgroundColor : item.status.color}">{{ item.status.title }}
              </div>
            </template>
          </UiDataTable>
          <UiNotification ref="notify"></UiNotification>
        </div>
      </div>
      <div class="flex flex-wrap w-full mt-10">
        <div class="w-full">
          <UiDataTable
              size="medium"
              :api="'json/sales-list.json'"
              :apiOpts="{ method: 'GET', body: {  } }"
              :config="config"
              title="Haftanın Çok Satanları"
              titleIcon="la-ticket"
          >

            <template #name="item">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" :src="item.image_url" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm text-gray-500">
                    {{ item.code }}
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ item.attributes[0].value }}
                  </div>
                </div>
              </div>
            </template>

            <template #status="item">
              <div class=" text-white text-sm w-20 rounded-md h-6 leading-6 text-center"
                   :style="{ backgroundColor : item.status.color}">{{ item.status.title }}
              </div>
            </template>
          </UiDataTable>
          <UiNotification ref="notify"></UiNotification>
        </div>
      </div>

    </main>
    <aside class="hidden xl:block xl:col-span-4">
      <div class="sticky top-4 space-y-4">
        <section aria-labelledby="trending-heading">
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Account balance</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Account balance</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Account balance</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Account balance</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Account balance</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Account balance</dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        <section aria-labelledby="trending-heading">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <h2 id="trending-heading" class="text-base font-medium text-gray-900">Mesajlar</h2>
              <div class="mt-6 flow-root">
                <ul role="list" class="-my-4 divide-y divide-gray-200">
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>
                  <li class="flex py-4 space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles">
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-gray-900 truncate">Floyd Miles</h4>
                      <p class="text-sm text-gray-800">What books do you have on your bookshelf just to look smarter than you actually are?</p>
                      <div class="mt-2 flex">
                          <span class="inline-flex items-center text-sm">
                            <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <!-- Heroicon name: solid/chat-alt -->
                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                              </svg>
                              <span class="font-medium text-gray-900">
                                20.10.2021 10:55
                              </span>
                            </button>
                          </span>
                      </div>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  </div>
</template>

<script>


export default {
  data() {
    return {
      config: {
        selectable: false,
        searchable: false,
        columns: [
          {
            'index': 'name',
            'slot': 'name',
            'label': "Stok Adı",
          },
          {
            'index': 'desired_stock',
            'label': "İstenilen Stok",
          },
          {
            'index': 'stock',
            'label': "Mevcut Stok",
          },
          {
            'index': 'unit',
            'label': "Birim",
          },
          {
            'index': 'status',
            'slot': 'status',
            'label': "Durum",
          }
        ],
        actions: [],

      },
      filters: [],
      form: null,
      saving: false,
    }
  },
  methods: {},
  mounted() {


  }
}

</script>