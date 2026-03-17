<script lang="ts">
  import Map from "$lib/components/Map.svelte";
  import IconamoonArrowRight2 from "~icons/iconamoon/arrow-right-2";
  import { createQuery } from "@tanstack/svelte-query";
  import { geoApi } from "$lib/api/geoApi";

  let ipAddressKey = $state<string | null>("");

  const geoQuery = createQuery(() => ({
    queryKey: ["geo", ipAddressKey],
    queryFn: () => geoApi(ipAddressKey),
  }));

  let findLat = $derived(geoQuery.data?.location.lat ?? null);

  let findLng = $derived(geoQuery.data?.location.lng ?? null);

  console.log(geoQuery.data);
  $effect(() => {
    console.log("key", ipAddressKey);
  });
</script>

<div class="w-full overflow-hidden min-h-screen relative">
  <!--image-->
  <div class="relative w-full">
    <img
      src="/images/pattern-bg-desktop.png"
      alt="pattern-bg"
      class=" w-full h-80 lg:h-60 object-cover"
    />
    <!--title-->
    <h1
      class="absolute text-xl text-nowrap pt-4 font-semibold z-10 top-0 text-white translate-x-1/2 left-10 md:left-50 lg:left-100 xl:left-140"
    >
      IP Address Tracker
    </h1>
    <!--input-->
    <div
      class="cursor-pointer flex rounded-xl h-15 md:h-10 bg-white absolute z-10 top-20 translate-x-1/2 w-100 -left-45 md:left-0 lg:left-50 xl:left-80"
    >
      <input
        bind:value={ipAddressKey}
        placeholder="Enter Your ip address"
        type="text"
        class="w-95 p-3 text-gray-600 rounded-l-xl border-blue-500 border"
      />
      <button
        onclick={() => {}}
        class="bg-gray-700 px-4 h-15 md:h-10 rounded-r-xl text-white cursor-pointer"
        ><IconamoonArrowRight2 class="w-5 h-5" /></button
      >
    </div>
  </div>
  <!--data-->
  <!--for sm screen -->
  <div
    class="lg:hidden top-40 min-w-90 -left-35 md:min-w-130 text-nowrap translate-x-1/2 rounded-xl shadow-xl h-fit grid place-items-center text-center gap-5 absolute bg-white z-10 p-6"
  >
    <div class=" text-xs text-gray-500 font-semibold">
      IP ADDRESS
      {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          <div class="text-sm text-gray-500">ip address:</div>
          {geoQuery.data.ip}
          <div class="text-sm text-gray-500">latitude.longitude:</div>
          {geoQuery.data.location.lat}.{geoQuery.data.location.lng}
        </div>
      {/if}
    </div>

    <div class=" text-xs text-gray-500 font-semibold">
      LOCATION {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>
      {:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          {geoQuery.data.location.country}
          {#if geoQuery.data.location.region || geoQuery.data.location.city}
            {#if geoQuery.data.location.region}
              ,{geoQuery.data.location.region}
              {#if geoQuery.data.location.city},{geoQuery.data.location
                  .city}{/if}{/if}
          {:else}{/if}
        </div>
      {/if}
    </div>
    <div class=" text-xs text-gray-500 font-semibold">
      TIMEZONE {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          UTC {geoQuery.data.location.timezone}
        </div>
      {/if}
    </div>
    <div class=" text-xs text-gray-500 font-semibold">
      ISP {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          {geoQuery.data.isp}
        </div>
      {/if}
    </div>
  </div>
  <!--for lg screen above-->
  <div
    class="hidden lg:block divide-x divide-gray-300 absolute z-10 h-fit bg-white lg:grid grid-cols-4 gap-5 p-6 top-40 left-50 right-50 rounded-xl shadow-xl"
  >
    <div class=" text-xs text-gray-500 font-semibold">
      IP ADDRESS
      {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          <div class="text-sm text-gray-500">ip address:</div>
          {geoQuery.data.ip}
          <div class="text-sm text-gray-500">latitude.longitude:</div>
          {geoQuery.data.location.lat}.{geoQuery.data.location.lng}
        </div>
      {/if}
    </div>

    <div class=" text-xs text-gray-500 font-semibold">
      LOCATION {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>
      {:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          {geoQuery.data.location.country}
          {#if geoQuery.data.location.region || geoQuery.data.location.city}
            {#if geoQuery.data.location.region}
              ,{geoQuery.data.location.region}
              {#if geoQuery.data.location.city},{geoQuery.data.location
                  .city}{/if}{/if}
          {:else}{/if}
        </div>
      {/if}
    </div>
    <div class=" text-xs text-gray-500 font-semibold">
      TIMEZONE {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          UTC {geoQuery.data.location.timezone}
        </div>
      {/if}
    </div>
    <div class=" text-xs text-gray-500 font-semibold">
      ISP {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          {geoQuery.data.isp}
        </div>
      {/if}
    </div>
  </div>

  <!--map success-->
  <div class="w-full relative grid place-items-center z-0">
    {#if geoQuery.isPending}
      <div
        class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-50 lg:mt-30 text-black w-fit text-sm"
      >
        Loading ...
      </div>
    {:else if geoQuery.isError}
      <div
        class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-50 lg:mt-30 text-black w-fit text-sm"
      >
        Failed
      </div>{:else}
      <Map bind:findLat bind:findLng />
    {/if}
  </div>
</div>
